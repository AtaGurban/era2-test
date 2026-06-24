import { Button } from '@/shared/ui/button';
import { Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  return (
    <Button variant="ghost" className={className}>
      <Moon className=" text-zinc-400" />
    </Button>
  );
}
