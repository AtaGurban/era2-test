import type { GenerationTask } from "@/entities/generation-task";

/** Состояние стора очереди */
export interface QueueStoreState {
  tasks: GenerationTask[];
  isLoading: boolean;
  initError: string | null;
}

/** Действия стора очереди */
export interface QueueStoreActions {
  // ─ Инициализация ─
  initSuccess: (tasks: GenerationTask[]) => void;
  setInitError: (error: string) => void;
  retryInit: () => void;

  // ─ Мутации задач ─
  startTask: (taskId: string) => void;
  tickProgress: (taskId: string, delta: number) => void;
  completeTask: (taskId: string) => void;
  failTask: (taskId: string, error: string) => void;
  cancelTask: (taskId: string) => void;
  retryTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  clearDone: () => void;
}

export type QueueStore = QueueStoreState & QueueStoreActions;

// типы публичного хука

export type SortOrder = "newest" | "oldest";

export interface QueueCounts {
  queued: number;
  running: number;
  done: number;
  failed: number;
  canceled: number;
  total: number;
}

export interface UseQueueResult {
  // Состояние
  tasks: GenerationTask[];
  isLoading: boolean;
  initError: string | null;

  // Вычисления
  counts: QueueCounts;
  averageProgress: number;
  activeCount: number;

  // Действия
  cancelTask: (taskId: string) => void;
  retryTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  clearDone: () => void;
  retryInit: () => void;
}
