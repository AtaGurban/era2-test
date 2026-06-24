import { useQueue } from "../model/useQueue";
import { LoadingState } from "./states/LoadingState";
import { ErrorState } from "./states/ErrorState";
import { EmptyState } from "./states/EmptyState";
import { TaskCard } from "./TaskCard";
import { useQueueFilterSort } from "../model/useQueueFilterSort";
import { motion, AnimatePresence } from "framer-motion";

const TaskList = () => {
  const { isLoading, initError, retryInit } = useQueue();
  const { filteredAndSortedTasks } = useQueueFilterSort();
  return (
    <div className="flex flex-col gap-2.5 mb-20">
      {isLoading && <LoadingState />}
      {initError && <ErrorState error={initError} onRetry={retryInit} />}
      {!isLoading && !initError && filteredAndSortedTasks.length === 0 && <EmptyState />}
      
      {!isLoading && !initError && filteredAndSortedTasks.length > 0 && (
        <AnimatePresence mode="popLayout">
          {filteredAndSortedTasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}

export default TaskList