import { Header } from "@/widgets/header";
import TaskRow from "@/features/generation-queue/ui/TaskRow";
import { Container } from "@/shared/ui";
import QueueStats from "@/features/generation-queue/ui/QueueStats";
import { useQueueEngine } from "@/features/generation-queue";
import { QueueToolbar } from "@/features/generation-queue/ui/QueueToolbar";
import TaskList from "@/features/generation-queue/ui/TaskList";
import { GenerationQueue } from "@/widgets/generation-queue";

export function QueuePage() {
  useQueueEngine()
  return (
    <div>
      <Header className="mb-6 md:mb-10" />
      <Container className="max-w-[1120px]">
        <TaskRow />
        <QueueStats />
        <QueueToolbar/>
        <TaskList />
      </Container>
      <GenerationQueue className="fixed bottom-6 right-6"/>
    </div>
  );
}
