import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-white text-black hover:bg-white/90': variant === 'primary',
            'bg-white/5 text-white hover:bg-white/10 border border-white/5': variant === 'secondary',
            'hover:bg-white/10 text-zinc-400 hover:text-white': variant === 'ghost',
            'bg-white/5 hover:bg-white/10 border border-white/5 rounded-full': variant === 'icon',
            
            'h-9 px-4 py-2': size === 'md' && variant !== 'icon',
            'h-8 px-3 text-xs': size === 'sm' && variant !== 'icon',
            'h-10 px-8': size === 'lg' && variant !== 'icon',
            'w-9 h-9': size === 'icon' || variant === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
