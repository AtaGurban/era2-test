import type { GenType } from '@/entities/generation-task';
import { useQueueStore } from './queueStore';
import { randomProgressStep, randomError } from './helpers';
import {
  MAX_CONCURRENT,
  TICK_INTERVAL_MS,
  FAILURE_PROBABILITY,
  DURATION_MULTIPLIER,
} from './constants';
import { randomInt } from '@/shared/lib/commonFunc';

// ── Класс движка ────────────────────────────────────────────

/**
 * QueueEngine — мок-движок обработки очереди.
 *
 * Читает данные через `useQueueStore.getState()`,
 * мутирует через экшены стора.
 * Единый источник правды — Zustand store.
 *
 * Для каждой running-задачи создаётся индивидуальный интервал
 * (хранится в `timers`), что позволяет:
 * - немедленно остановить тики при cancel конкретной задачи;
 * - варьировать скорость по типу генерации.
 */
export class QueueEngine {
  private timers = new Map<string, ReturnType<typeof setInterval>>();
  private schedulerTimer: ReturnType<typeof setInterval> | null = null;
  private stopped = false;

  private get store() {
    return useQueueStore.getState();
  }

  /** Запустить движок — включает планировщик слотов */
  start(): void {
    this.stopped = false;
    // Планировщик проверяет свободные слоты каждые 300 мс
    this.schedulerTimer = setInterval(() => this.scheduleNext(), 300);
    // Сразу запускаем тики для уже running задач (из сида / restore)
    this.resumeExistingRunning();
    this.scheduleNext();
  }

  /** Остановить движок — чистим все таймеры */
  stop(): void {
    this.stopped = true;
    if (this.schedulerTimer !== null) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    for (const [, timer] of this.timers) {
      clearInterval(timer);
    }
    this.timers.clear();
  }

  /** Немедленно остановить тики конкретной задачи и отменить её */
  cancelTask(taskId: string): void {
    this.clearTaskTimer(taskId);
    this.store.cancelTask(taskId);
  }

  // ── Приватные методы ────────────────────────────────────────

  /** При старте — у уже running задач запускаем прогресс-тики */
  private resumeExistingRunning(): void {
    const { tasks } = this.store;
    for (const task of tasks) {
      if (task.status === 'running' && !this.timers.has(task.id)) {
        this.startProgressTicks(task.id, task.genType);
      }
    }
  }

  /** Планировщик: свободные слоты → запуск следующих queued (FIFO) */
  private scheduleNext(): void {
    if (this.stopped) return;

    const { tasks } = this.store;
    const runningCount = tasks.filter((t) => t.status === 'running').length;
    const freeSlots = MAX_CONCURRENT - runningCount;

    if (freeSlots <= 0) return;

    const queued = tasks
      .filter((t) => t.status === 'queued')
      .sort((a, b) => a.createdAt - b.createdAt);

    const toStart = queued.slice(0, freeSlots);
    for (const task of toStart) {
      this.store.startTask(task.id);
      this.startProgressTicks(task.id, task.genType);
    }
  }

  /** Запуск индивидуального таймера прогресса для задачи */
  private startProgressTicks(taskId: string, genType: GenType): void {
    this.clearTaskTimer(taskId);

    const multiplier = DURATION_MULTIPLIER[genType];
    const interval = TICK_INTERVAL_MS + randomInt(-100, 100);

    const timer = setInterval(() => {
      if (this.stopped) {
        this.clearTaskTimer(taskId);
        return;
      }

      const { tasks } = this.store;
      const task = tasks.find((t) => t.id === taskId);

      // Задача уже не running — чистим
      if (!task || task.status !== 'running') {
        this.clearTaskTimer(taskId);
        return;
      }

      // Случайный сбой
      if (Math.random() < FAILURE_PROBABILITY) {
        this.clearTaskTimer(taskId);
        this.store.failTask(taskId, randomError());
        return;
      }

      // Шаг прогресса с учётом множителя типа
      const rawStep = randomProgressStep();
      const step = Math.max(1, Math.round(rawStep / multiplier));
      const newProgress = task.progress + step;

      if (newProgress >= 100) {
        this.clearTaskTimer(taskId);
        this.store.completeTask(taskId);
      } else {
        this.store.tickProgress(taskId, step);
      }
    }, interval);

    this.timers.set(taskId, timer);
  }

  private clearTaskTimer(taskId: string): void {
    const timer = this.timers.get(taskId);
    if (timer !== undefined) {
      clearInterval(timer);
      this.timers.delete(taskId);
    }
  }
}
