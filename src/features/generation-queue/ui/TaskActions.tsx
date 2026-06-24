import type { GenerationTask } from "@/entities/generation-task/model/types";
import { useQueue } from "@/features/generation-queue/model/useQueue";
import { Button } from "@/shared/ui/button";
import { X, Download, RotateCcw, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface TaskActionsProps {
  task: GenerationTask;
}

export function TaskActions({ task }: TaskActionsProps) {
  const { cancelTask, retryTask, deleteTask } = useQueue();

  return (
    <div className="flex items-center gap-2">
      {/* Actions based on status */}
      {(task.status === "running" || task.status === "queued") && (
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md bg-transparent border-[#2D2420] text-[#8C7F78] hover:text-[#F6EFE9] hover:bg-[#2D2420]"
          onClick={() => cancelTask(task.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {task.status === "done" && (
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md bg-transparent border-[#2D2420] text-[#EA592C] hover:bg-[#2D2420]"
          onClick={() => {
            // Mock download
            console.log("Download", task.id);
          }}
        >
          <Download className="h-4 w-4" />
        </Button>
      )}

      {(task.status === "failed" || task.status === "canceled") && (
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md bg-transparent border-[#2D2420] text-[#EA592C] hover:bg-[#2D2420]"
          onClick={() => retryTask(task.id)}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}

      {/* Options menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md bg-transparent border-[#2D2420] text-[#8C7F78] hover:text-[#F6EFE9] hover:bg-[#2D2420]"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 border-[#2D2420] bg-[#160E0B] text-[#F6EFE9]">
          <DropdownMenuItem 
            className="text-[#E03A3A] focus:text-[#E03A3A] focus:bg-[#3D1A1A] cursor-pointer"
            onClick={() => deleteTask(task.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
