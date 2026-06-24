import { cn } from "@/shared/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="w-8 h-8 rounded-lg bg-[#f97316] flex items-center justify-center text-white font-bold text-lg">
        E
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-white font-semibold text-lg leading-none">era2</span>
        <span className="text-zinc-500 text-sm font-medium leading-none">.ai</span>
      </div>
    </div>
  );
}
