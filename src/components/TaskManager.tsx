"use client";

import { useState } from "react";
import type { Task, CreateTaskInput } from "@/src/types";
import { createTask, updateTask, deleteTask } from "@/src/lib/api";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface TaskManagerProps {
  initialTasks: Task[];
}

export default function TaskManager({ initialTasks }: TaskManagerProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (input: CreateTaskInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const task = await createTask(input);
      setTasks((prev) => [task, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: string, input: CreateTaskInput) => {
    setError(null);
    try {
      const updated = await updateTask(id, input);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task.");
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    setError(null);
    try {
      const updated = await updateTask(id, { completed });
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task.");
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task.");
    }
  };

  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          New task
        </h2>
        <TaskForm
          onSubmit={handleCreate}
          isLoading={isSubmitting}
          submitLabel="Add task"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {total > 0 && (
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          {done} of {total} task{total !== 1 ? "s" : ""} completed
        </p>
      )}

      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
