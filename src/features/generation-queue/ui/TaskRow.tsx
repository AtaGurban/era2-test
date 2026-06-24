import { Button } from "@/shared/ui/button";
import { useQueue } from "../model/useQueue";

const TaskRow = () => {
  const {clearDone} = useQueue()
  return (
    <div className="flex items-center justify-between mb-5 md:mb-6">
      <div>
        <h3 className="mb-1 font-bold text-[26px] md:text-[30px] text-[#F6EFE9]">
          Очередь генераций
        </h3>
        <p className="text-[#8C7F78] mb-0">
          Все ваши задачи в реальном времени
        </p>
      </div>
      <div className="hidden md:block">
        <Button onClick={clearDone} className="bg-transparent rounded-full border text-[#C8BEB6] font-medium border-[#2D2420] px-4 py-3">Очистить готовые</Button>
      </div>
    </div>
  );
};

export default TaskRow;
