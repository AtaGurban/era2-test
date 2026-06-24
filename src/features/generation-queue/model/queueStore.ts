import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import { canTransition } from './helpers';
import { STORAGE_KEY } from './constants';
import type { QueueStore } from './types';

export const useQueueStore = create<QueueStore>()(
  persist(
    (set) => ({
      // ── State ───────────────────────────────────────────────
      tasks: [],
      isLoading: true,
      initError: null,

      // ── Инициализация ───────────────────────────────────────
      initSuccess: (tasks) =>
        set({ tasks, isLoading: false, initError: null }),

      setInitError: (error) =>
        set({ isLoading: false, initError: error }),

      retryInit: () =>
        set({ isLoading: true, initError: null }),

      // ── Мутации задач ───────────────────────────────────────
      startTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId && canTransition(t.status, 'running')
              ? { ...t, status: 'running' as const, progress: 0, startedAt: Date.now(), error: undefined }
              : t,
          ),
        })),

      tickProgress: (taskId, delta) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId && t.status === 'running'
              ? { ...t, progress: Math.min(100, t.progress + delta) }
              : t,
          ),
        })),

      completeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId && canTransition(t.status, 'done')
              ? { ...t, status: 'done' as const, progress: 100, completedAt: Date.now() }
              : t,
          ),
        })),

      failTask: (taskId, error) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId && canTransition(t.status, 'failed')
              ? { ...t, status: 'failed' as const, error, completedAt: Date.now() }
              : t,
          ),
        })),

      cancelTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId && canTransition(t.status, 'canceled')
              ? { ...t, status: 'canceled' as const, completedAt: Date.now() }
              : t,
          ),
        })),

      retryTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId && canTransition(t.status, 'queued')
              ? {
                  ...t,
                  status: 'queued' as const,
                  progress: 0,
                  error: undefined,
                  startedAt: undefined,
                  completedAt: undefined,
                  createdAt: Date.now(),
                }
              : t,
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),

      clearDone: () =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.status !== 'done'),
        })),
    }),
    {
      name: STORAGE_KEY,
      // Персистим только tasks; isLoading/initError — рантайм
      partialize: (state) => ({ tasks: state.tasks }),
      storage: createJSONStorage(() => sessionStorage),
      // При восстановлении: running → queued (не знаем на каком тике остановились)
      merge: (persisted, current) => {
        const p = persisted as { tasks?: QueueStore['tasks'] };
        const restoredTasks = (p?.tasks ?? []).map((t) =>
          t.status === 'running'
            ? { ...t, status: 'queued' as const, progress: 0, startedAt: undefined }
            : t,
        );
        return {
          ...current,
          tasks: restoredTasks.length > 0 ? restoredTasks : current.tasks,
        };
      },
    },
  ),
);
