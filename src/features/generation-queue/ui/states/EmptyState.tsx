import { Inbox } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-16 w-16 bg-[#2D2420] rounded-full flex items-center justify-center mb-4">
        <Inbox className="h-8 w-8 text-[#8C7F78]" />
      </div>
      <h3 className="text-xl font-semibold text-[#F6EFE9] mb-2">Очередь пуста</h3>
      <p className="text-[#8C7F78] max-w-md">
        У вас пока нет задач на генерацию. Создайте новый запрос, и он появится здесь.
      </p>
    </div>
  );
}
