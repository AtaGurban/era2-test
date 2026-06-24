export function formatEta(ms: number): string {
  if (ms < 1000) return `${ms} мс`;
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds} сек`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds === 0) return `${minutes} мин`;
  return `${minutes} мин ${remainingSeconds} сек`;
}
