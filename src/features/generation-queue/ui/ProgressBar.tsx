interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  // progress is 0-100
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`h-1.5 w-full bg-[#2D2420] rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-[#EA592C] transition-all duration-300 ease-in-out"
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
}
