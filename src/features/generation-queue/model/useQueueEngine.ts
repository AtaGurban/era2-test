import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { seedTasks } from '@/entities/generation-task';
import { useQueueStore } from './queueStore';
import { QueueEngine } from './queueEngine';
import { INIT_DELAY_MS, INIT_FAILURE_PROBABILITY } from './constants';


// ── Хук-движок: запуск/остановка + инициализация ────────────

/**
 * Хук для управления жизненным циклом движка.
 * Вызывается один раз на уровне виджета/провайдера.
 */
export function useQueueEngine(): void {
  const engineRef = useRef<QueueEngine | null>(null);
  const { isLoading, initError, tasks } = useQueueStore(
    useShallow((s) => ({
      isLoading: s.isLoading,
      initError: s.initError,
      tasks: s.tasks,
    })),
  );

  // Инициализация: загрузка сида с эмуляцией задержки
  useEffect(() => {
    const store = useQueueStore.getState();

    // Если задачи уже восстановлены из sessionStorage — пропускаем сид
    if (store.tasks.length > 0) {
      store.initSuccess(store.tasks);
      return;
    }

    const timer = setTimeout(() => {
      if (Math.random() < INIT_FAILURE_PROBABILITY) {
        useQueueStore.getState().setInitError('Не удалось загрузить очередь. Проверьте соединение.');
        return;
      }
      useQueueStore.getState().initSuccess(seedTasks);
    }, INIT_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Запуск / остановка движка
  useEffect(() => {
    if (isLoading || initError || tasks.length === 0) return;

    const engine = new QueueEngine();
    engineRef.current = engine;
    engine.start();

    return () => {
      engine.stop();
      engineRef.current = null;
    };
  }, [isLoading, initError, tasks.length]);

  // Подписываемся на retryInit
  useEffect(() => {
    if (!isLoading || !initError) return;
    // Нет нужды — retryInit вызывается из компонента напрямую
  }, [isLoading, initError]);
}

