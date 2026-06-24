import type { GenerationTask } from "@/entities/generation-task";

interface StatusBadgeProps {
  task: GenerationTask;
  className?: string;
}

export function StatusBadge({ task, className = "" }: StatusBadgeProps) {
  const { status, progress } = task;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {status === "running" && (
        <span className="text-[#EA592C] font-medium text-sm hidden md:inline-block">
          {Math.round(progress)}%
        </span>
      )}
      
      {status === "running" && (
        <div className="px-3 py-1 rounded-md bg-[#3D2216] text-[#EA592C] text-sm font-medium">
          Идёт
        </div>
      )}

      {status === "running" && (
        <span className="text-[#EA592C] font-medium text-sm md:hidden">
          {Math.round(progress)}%
        </span>
      )}

      {status === "queued" && (
        <div className="px-3 py-1 rounded-md bg-[#1F1815] text-[#8C7F78] text-sm font-medium">
          В очереди
        </div>
      )}

      {status === "done" && (
        <div className="px-3 py-1 rounded-md bg-[#163D2B] text-[#29A366] text-sm font-medium">
          Готово
        </div>
      )}

      {status === "failed" && (
        <div className="px-3 py-1 rounded-md bg-[#3D1A1A] text-[#E03A3A] text-sm font-medium">
          Ошибка
        </div>
      )}

      {status === "canceled" && (
        <div className="px-3 py-1 rounded-md bg-[#1F1815] text-[#8C7F78] text-sm font-medium">
          Отменено
        </div>
      )}
    </div>
  );
}
