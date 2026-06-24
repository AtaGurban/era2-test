import type { GenType } from '@/entities/generation-task';

// ── Движок ──────────────────────────────────────────────────

/** Максимум одновременно running задач */
export const MAX_CONCURRENT = 2;

/** Базовый интервал тика прогресса (мс) */
export const TICK_INTERVAL_MS = 500;

/** Вероятность сбоя на каждом тике (~2% за тик ≈ ~15% за прогон) */
export const FAILURE_PROBABILITY = 0.02;

/** Диапазон случайного шага прогресса (до применения множителя) */
export const PROGRESS_STEP_MIN = 3;
export const PROGRESS_STEP_MAX = 12;

/**
 * Множители длительности по типу генерации.
 * Чем больше множитель, тем медленнее растёт прогресс
 * (шаг делится на множитель).
 */
export const DURATION_MULTIPLIER: Record<GenType, number> = {
  text: 1,
  image: 1.5,
  video: 3,
  audio: 2.5,
};

/** Тексты ошибок для случайных сбоев */
export const ERROR_MESSAGES = [
  'Недостаточно кредитов',
  'Превышено время ожидания',
  'Модель временно недоступна',
  'Ошибка при обработке запроса',
  'Сервер перегружен, попробуйте позже',
] as const;

// ── Инициализация ───────────────────────────────────────────

/** Задержка эмуляции загрузки сида (мс) */
export const INIT_DELAY_MS = 600;

/** Вероятность сбоя инициализации (для демонстрации ErrorState) */
export const INIT_FAILURE_PROBABILITY = 0.05;

// ── sessionStorage ────────────────────────────────────────────

export const STORAGE_KEY = 'era2-queue';
