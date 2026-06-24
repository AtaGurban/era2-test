import { cn } from "@/shared/lib/utils";

interface ProfileButtonProps {
  className?: string;
}

export function ProfileButton({ className }: ProfileButtonProps) {
  return (
    <button 
      className={cn("w-9 h-9 cursor-pointer rounded-full flex items-center justify-center text-white font-medium hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20", className)}
      style={{ background: 'linear-gradient(135deg, #8C4D99 0%, #4D3380 70.72%)' }}
    >
      A
    </button>
  );
}
