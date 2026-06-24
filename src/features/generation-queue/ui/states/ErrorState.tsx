import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-16 w-16 bg-[#3D1A1A] rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-[#E03A3A]" />
      </div>
      <h3 className="text-xl font-semibold text-[#F6EFE9] mb-2">Ошибка загрузки</h3>
      <p className="text-[#8C7F78] max-w-md mb-6">{error}</p>
      <Button 
        onClick={onRetry}
        className="bg-[#EA592C] text-white hover:bg-[#D54D22]"
      >
        Повторить попытку
      </Button>
    </div>
  );
}
