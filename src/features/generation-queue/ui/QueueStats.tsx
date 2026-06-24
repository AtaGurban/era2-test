import { Card } from "@/shared/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useQueueStats } from "../model/useQueueStats";

const QueueStats = () => {
  const { statBlockData } = useQueueStats();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 md:mb-6">
      {statBlockData.map((data, index) => (
        <Card key={index} className="flex flex-col gap-3 p-4.5 md:p-5 bg-[#14100F] border-[#1F1917] rounded-xl overflow-hidden">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${data.circleColor}`} />
            <span className="text-sm font-medium text-[#8A7F78]">
              {data.label}
            </span>
          </div>
          <div className="relative h-[32px] flex items-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={data.value}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-2xl font-bold text-white absolute"
              >
                {data.value}
              </motion.span>
            </AnimatePresence>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QueueStats;
