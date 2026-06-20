import type { Task } from "@/src/types";
import { getTasks } from "@/src/lib/api";
import TaskManager from "@/src/components/TaskManager";
import GitHubLookup from "@/src/components/GitHubLookup";

export const dynamic = "force-dynamic";

export default async function Home() {
  let initialTasks: Task[] = [];
  let fetchError: string | null = null;

  try {
    initialTasks = await getTasks();
  } catch {
    fetchError = "Could not connect to the server. Make sure the backend is running.";
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Task Manager
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Track your tasks, stay focused.
        </p>
      </header>

      {fetchError ? (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
        >
          {fetchError}
        </div>
      ) : null}

      <TaskManager initialTasks={initialTasks} />

      <section className="mt-14" aria-labelledby="github-heading">
        <h2
          id="github-heading"
          className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50"
        >
          GitHub Profile Lookup
        </h2>
        <GitHubLookup />
      </section>
    </main>
  );
}
