import type { Task, CreateTaskInput } from "@/src/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, input: CreateTaskInput) => Promise<void>;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onUpdate,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 py-12 text-center dark:border-zinc-700">
        <p className="text-sm text-zinc-400 dark:text-zinc-600">
          No tasks yet. Add one above to get started.
        </p>
      </div>
    );
  }

  const pending = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);

  return (
    <div className="space-y-4">
      {pending.length > 0 && (
        <section aria-label="Pending tasks">
          <ul className="space-y-2">
            {pending.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </ul>
        </section>
      )}

      {done.length > 0 && (
        <section aria-label="Completed tasks">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
            Completed ({done.length})
          </p>
          <ul className="space-y-2">
            {done.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
