import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useQueueStore } from "./queueStore";
import type { QueueCounts, UseQueueResult } from "./types";

/**
 * Публичный хук доступа к состоянию, вычислениям и действиям очереди.
 */
export function useQueue(): UseQueueResult {
  const { tasks, isLoading, initError } = useQueueStore(
    useShallow((s) => ({
      tasks: s.tasks,
      isLoading: s.isLoading,
      initError: s.initError,
    })),
  );

  const cancelTask = useQueueStore((s) => s.cancelTask);
  const retryTask = useQueueStore((s) => s.retryTask);
  const deleteTask = useQueueStore((s) => s.deleteTask);
  const clearDone = useQueueStore((s) => s.clearDone);
  const retryInit = useQueueStore((s) => s.retryInit);

  // ── Счётчики ──
  const counts = useMemo<QueueCounts>(() => {
    const c: QueueCounts = {
      queued: 0,
      running: 0,
      done: 0,
      failed: 0,
      canceled: 0,
      total: 0,
    };
    for (const t of tasks) {
      c[t.status]++;
      c.total++;
    }
    return c;
  }, [tasks]);

  // ── Средний прогресс running-задач ──
  const averageProgress = useMemo(() => {
    const running = tasks.filter((t) => t.status === "running");
    if (running.length === 0) return 0;
    const sum = running.reduce((acc, t) => acc + t.progress, 0);
    return Math.round(sum / running.length);
  }, [tasks]);

  // ── Число активных задач (running + queued) ──
  const activeCount = useMemo(
    () =>
      tasks.filter((t) => t.status === "running" || t.status === "queued")
        .length,
    [tasks],
  );

  return {
    tasks,
    isLoading,
    initError,
    counts,
    averageProgress,
    activeCount,
    cancelTask,
    retryTask,
    deleteTask,
    clearDone,
    retryInit,
  };
}
