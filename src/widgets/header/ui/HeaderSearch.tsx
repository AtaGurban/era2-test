import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useHeaderSearch } from '../model/useHeaderSearch';

interface HeaderSearchProps {
  className?: string;
}

export function HeaderSearch({ className }: HeaderSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { localQuery, handleQueryChange } = useHeaderSearch();

  return (
    <div className={cn("flex items-center", className)}>
      {/* Desktop Search Bar */}
      <div className="hidden lg:flex relative items-center w-64">
        <Search className="absolute left-3 w-4 h-4 text-zinc-400" />
        <Input 
          type="search" 
          placeholder="Поиск моделей" 
          value={localQuery}
          onChange={handleQueryChange}
          className="pl-9 bg-white/5 border-white/5 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-white/20 transition-colors hover:bg-white/10 rounded-full h-9"
        />
      </div>

      {/* Mobile/Tablet Search */}
      <div className="flex lg:hidden items-center">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => setIsExpanded(true)}>
          <Search className="w-4 h-4 text-zinc-400" />
        </Button>

        {isExpanded && (
          <div className="fixed inset-x-0 top-0 h-14 bg-[#0a0a0a] z-50 px-4 flex items-center gap-2 lg:hidden border-b border-white/5">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-zinc-400" />
              <Input 
                autoFocus
                type="search" 
                placeholder="Поиск моделей..." 
                value={localQuery}
                onChange={handleQueryChange}
                className="w-full pl-9 bg-white/5 border-white/5 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-white/20 transition-colors rounded-full h-9"
              />
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full shrink-0" onClick={() => setIsExpanded(false)}>
              <X className="w-4 h-4 text-zinc-400" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
