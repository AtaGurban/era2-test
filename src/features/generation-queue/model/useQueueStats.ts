import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { useQueueStore } from "./queueStore";
import type { TaskStatus } from "@/entities/generation-task";

export const useQueueStats = () => {
  const { tasks } = useQueueStore(useShallow((s) => ({ tasks: s.tasks })));

  const byStatus = useMemo(
    () => {
      const counts: Record<TaskStatus, number> = {
        queued: 0,
        running: 0,
        done: 0,
        failed: 0,
        canceled: 0,
      };

      for (const task of tasks) {
        counts[task.status]++;
      }

      return counts;
    },
    [tasks],
  );

  const statBlockData = useMemo(() => [
    {
      label: "В очереди",
      value: byStatus.queued,
      circleColor: "bg-[#8A7F78]",
    },
    {
      label: "Идёт",
      value: byStatus.running,
      circleColor: "bg-[#E85420]",
    },
    {
      label: "Готово",
      value: byStatus.done,
      circleColor: "bg-[#34D399]",
    },
    {
      label: "Ошибка",
      value: byStatus.failed,
      circleColor: "bg-[#FF6B6B]",
    },
  ], [byStatus]);

  return { statBlockData };
};
