import { Container } from '@/shared/ui';
import { Logo } from './Logo';
import { HeaderSearch } from './HeaderSearch';
import { ThemeToggle } from './ThemeToggle';
import { ProfileButton } from './ProfileButton';
import { cn } from '@/shared/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("h-14 border-b border-white/5 bg-[#0a0a0a]", className)}>
      <Container className="h-full flex items-center justify-between">
        <Logo />

        {/* Actions Area */}
        <div className="flex items-center gap-3">
          <HeaderSearch />
          <ThemeToggle className='rounded-full border border-[#2D2420] w-9 h-9 p-2'/>
          <ProfileButton />
        </div>
      </Container>
    </header>
  );
}
