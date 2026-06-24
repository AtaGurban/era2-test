import type { TaskStatus } from '@/entities/generation-task';
import { ERROR_MESSAGES, PROGRESS_STEP_MIN, PROGRESS_STEP_MAX } from './constants';
import { randomInt } from '@/shared/lib/commonFunc';

// ── Случайные числа ─────────────────────────────────────────


export function randomProgressStep(): number {
  return randomInt(PROGRESS_STEP_MIN, PROGRESS_STEP_MAX);
}

export function randomError(): string {
  return ERROR_MESSAGES[randomInt(0, ERROR_MESSAGES.length - 1)];
}

// ── Конечный автомат статусов ───────────────────────────────

const VALID_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  queued: ['running', 'canceled'],
  running: ['done', 'failed', 'canceled'],
  done: [],
  failed: ['queued'],
  canceled: ['queued'],
};

export function canTransition(from: TaskStatus, to: TaskStatus): boolean {
  return VALID_TRANSITIONS[from].includes(to);
}
