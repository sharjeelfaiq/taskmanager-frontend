"use client";

import { useState } from "react";
import type { Task, CreateTaskInput } from "@/src/types";
import TaskForm from "./TaskForm";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, input: CreateTaskInput) => Promise<void>;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(task._id, !task.completed);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task._id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (input: CreateTaskInput) => {
    await onUpdate(task._id, input);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
        <TaskForm
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          initialValues={{ title: task.title, description: task.description }}
          submitLabel="Save changes"
        />
      </li>
    );
  }

  return (
    <li className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        disabled={isToggling}
        aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-blue-600 disabled:cursor-not-allowed"
      />

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium break-words ${
            task.completed
              ? "text-zinc-400 line-through dark:text-zinc-600"
              : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p
            className={`mt-0.5 text-xs break-words ${
              task.completed
                ? "text-zinc-300 dark:text-zinc-700"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 gap-1">
        <button
          onClick={() => setIsEditing(true)}
          aria-label={`Edit "${task.title}"`}
          className="rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label={`Delete "${task.title}"`}
          className="rounded-md p-1.5 text-zinc-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-950/30 dark:hover:text-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
