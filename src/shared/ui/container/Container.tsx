import { cn } from '@/shared/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full px-4 lg:px-6", className)}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';
