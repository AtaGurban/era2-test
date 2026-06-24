import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-8 w-8 text-[#EA592C] animate-spin mb-4" />
      <p className="text-[#8C7F78] font-medium">Загрузка очереди...</p>
    </div>
  );
}
