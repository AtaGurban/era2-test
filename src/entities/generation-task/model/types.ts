/** Тип генерации */
export type GenType = 'text' | 'image' | 'video' | 'audio';

/** Статусы задачи — конечный автомат */
export type TaskStatus = 'queued' | 'running' | 'done' | 'failed' | 'canceled';

/** Задача генерации */
export interface GenerationTask {
  id: string;
  /** Тип генерации */
  genType: GenType;
  /** Промпт пользователя */
  prompt: string;
  /** Название модели */
  model: string;
  /** Текущий статус */
  status: TaskStatus;
  /** Прогресс 0–100 (актуален для running) */
  progress: number;
  /** Текст ошибки (для failed) */
  error?: string;
  /** Стоимость в кредитах */
  credits: number;
  /** Время создания */
  createdAt: number;
  /** Время начала выполнения */
  startedAt?: number;
  /** Время завершения */
  completedAt?: number;
  /** Ожидаемое время до завершения (мс) */
  estimatedDuration: number;
}
