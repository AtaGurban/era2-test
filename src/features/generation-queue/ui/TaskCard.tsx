import type { GenerationTask } from "@/entities/generation-task/model/types";
import { TaskActions } from "./TaskActions";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";
import { formatEta } from "../lib/formatEta";
import { 
  ImageIcon, 
  Play, 
  MessageCircle, 
  Music 
} from "lucide-react";

interface TaskCardProps {
  task: GenerationTask;
}

export function TaskCard({ task }: TaskCardProps) {
  const getIcon = () => {
    switch (task.genType) {
      case "image": return <ImageIcon className="w-5 h-5 text-[#EA592C]" />;
      case "video": return <Play className="w-5 h-5 text-[#EA592C]" fill="currentColor" />;
      case "text": return <MessageCircle className="w-5 h-5 text-[#E3D9D1]" fill="currentColor" />;
      case "audio": return <Music className="w-5 h-5 text-[#EA592C]" />;
      default: return <ImageIcon className="w-5 h-5 text-[#EA592C]" />;
    }
  };

  const getSecondaryText = () => {
    switch (task.status) {
      case "running":
        return `≈ ${formatEta(task.estimatedDuration)} · ${task.credits} cr`;
      case "queued":
        return `в очереди · ${task.credits} cr`;
      case "done":
        return `готово за ${formatEta(task.estimatedDuration)} · ${task.credits} cr`;
      case "failed":
        return task.error || `недостаточно кредитов`;
      case "canceled":
        return `отменено пользователем`;
      default:
        return "";
    }
  };

  const isRunning = task.status === "running";

  return (
    <div 
      className={`p-4 md:p-5 rounded-2xl border transition-colors ${
        isRunning ? 'border-[#EA592C]/50 bg-[#160E0B]' : 'border-[#2D2420] bg-transparent'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        
        {/* Top/Left Section: Icon and Title/Info */}
        <div className="flex items-start md:items-center gap-4 flex-grow min-w-0">
          <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center ${
            task.genType === 'text' ? 'bg-[#3D2216]' : 'bg-[#2D1B14]'
          }`}>
            {getIcon()}
          </div>

          <div className="flex-grow min-w-0 flex flex-col justify-center">
            <h4 className="text-[#F6EFE9] text-base font-medium truncate mb-1">
              {task.prompt}
            </h4>
            <div className="text-sm text-[#8C7F78] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#EA592C]"></div>
              <span className="font-medium text-[#C8BEB6]">{task.model}</span>
              <span>·</span>
              <span className="truncate">{getSecondaryText()}</span>
            </div>
            
            {/* Desktop ProgressBar (hidden on mobile) */}
            {isRunning && (
              <div className="hidden md:block mt-3 w-4/5 max-w-md">
                <ProgressBar progress={task.progress} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile ProgressBar (hidden on desktop) */}
        {isRunning && (
          <div className="block md:hidden w-full">
            <ProgressBar progress={task.progress} />
          </div>
        )}

        {/* Bottom/Right Section: Status Badge and Actions */}
        <div className="flex items-center justify-between md:justify-end gap-4 mt-2 md:mt-0 flex-shrink-0">
          <StatusBadge task={task} />
          <TaskActions task={task} />
        </div>

      </div>
    </div>
  );
}
