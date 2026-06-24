import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueue } from '@/features/generation-queue/model/useQueue';
import { Moon, ArrowRight, ChevronDown, Play, FileText, Music } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { GenType, GenerationTask } from '@/entities/generation-task/model/types';
import { getPlural, getTypeName } from '../model/helper';

const getTypeIcon = (type: GenType) => {
  switch (type) {
    case 'video': return <Play className="w-4 h-4 fill-current" />;
    case 'text': return <FileText className="w-4 h-4 fill-current" />;
    case 'audio': return <Music className="w-4 h-4 fill-current" />;
    case 'image':
    default: return <Moon className="w-4 h-4 fill-current" />;
  }
};

export const GenerationQueue = ({ className }: { className?: string }) => {
  const { activeCount, averageProgress, tasks } = useQueue();
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const activeTasks = tasks.filter(t => t.status === 'running' || t.status === 'queued').slice(0, 3);

  if (activeCount === 0) return null;

  const renderCollapsed = () => (
    <div 
      className={cn("flex items-center gap-3 px-4 py-2 bg-[#121212] border border-[#2A2A2A] rounded-full cursor-pointer hover:bg-[#1A1A1A] transition-colors w-max shadow-lg", className)}
      onClick={() => setIsExpanded(true)}
    >
      <Moon className="w-4 h-4 text-[#F97316] fill-transparent" />
      <span className="text-sm font-medium text-white">
        {activeCount} {getPlural(activeCount, ['генерация', 'генерации', 'генераций'])}
      </span>
      <span className="text-sm text-neutral-500">·</span>
      <span className="text-sm font-medium text-[#F97316]">{averageProgress}%</span>
    </div>
  );

  const renderSingle = (task: GenerationTask) => (
    <div className={cn("w-[332px] bg-[#121212] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col relative shadow-lg transition-colors hover:border-[#3A3A3A]", className)}>
      <div 
        className="p-4 flex items-center justify-between cursor-pointer group"
        onClick={() => navigate('/queue')}
      >
        <div className="flex items-center gap-3">
          <Moon className="w-5 h-5 text-[#F97316] fill-transparent" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">{getTypeName(task.genType)}</span>
            <span className="text-xs text-neutral-400">{task.model} · {task.progress}%</span>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
      </div>
      
      <div className="px-4 pb-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2A1E1A] to-[#120D0A] flex-shrink-0" />
          <div className="flex flex-col flex-1 gap-2 pt-1">
            <p className="text-sm text-neutral-300 line-clamp-2 leading-snug pr-4">{task.prompt}</p>
            <div className="w-full h-1 bg-[#2A2A2A] rounded-full overflow-hidden mt-auto">
              <div 
                className="h-full bg-[#F97316] rounded-full transition-all duration-300" 
                style={{ width: `${task.progress}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute top-4 right-10 p-1 cursor-pointer hover:bg-[#2A2A2A] rounded-md transition-colors"
        onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
      >
         <ChevronDown className="w-4 h-4 text-neutral-500 hover:text-white" />
      </div>
    </div>
  );

  const renderMultiple = (tasks: GenerationTask[]) => (
    <div className={cn("w-[332px] bg-[#121212] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col shadow-lg", className)}>
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#1A1A1A] transition-colors"
        onClick={() => setIsExpanded(false)}
      >
        <div className="flex items-center gap-3">
          <Moon className="w-5 h-5 text-[#F97316] fill-transparent" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">Генерации идут</span>
            <span className="text-xs text-neutral-400">{activeCount} активны · {averageProgress}%</span>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-neutral-400" />
      </div>
      
      <div className="flex flex-col">
        {tasks.map((task) => (
          <div key={task.id} className="px-4 py-3 flex gap-3">
             <div className="text-[#F97316] pt-0.5">
                 {getTypeIcon(task.genType)}
             </div>
             <div className="flex flex-col flex-1 gap-1.5 overflow-hidden">
               <div className="flex items-start justify-between gap-2">
                 <p className="text-sm text-neutral-300 truncate">{task.prompt}</p>
                 <span className="text-xs text-[#F97316] font-medium whitespace-nowrap">
                   {task.status === 'queued' ? 'в очереди' : `${task.progress}%`}
                 </span>
               </div>
               {task.status === 'running' && (
                 <div className="w-[85%] h-0.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-[#F97316] rounded-full transition-all duration-300" 
                     style={{ width: `${task.progress}%` }} 
                   />
                 </div>
               )}
             </div>
          </div>
        ))}
      </div>
      
      <div 
        className="p-4 border-t border-[#2A2A2A] flex items-center justify-center gap-2 cursor-pointer hover:bg-[#1A1A1A] hover:text-white text-[#F97316] transition-colors"
        onClick={() => navigate('/queue')}
      >
        <span className="text-sm font-medium">Открыть очередь</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );

  if (!isExpanded) {
    return renderCollapsed();
  }

  if (activeCount === 1 && activeTasks.length > 0) {
    return renderSingle(activeTasks[0]);
  }

  return renderMultiple(activeTasks);
};
