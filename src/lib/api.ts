import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  GitHubProfile,
} from "@/src/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? "Request failed");
  }

  return json.data as T;
}

export async function getTasks(): Promise<Task[]> {
  return apiFetch<Task[]>("/tasks");
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  return apiFetch<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateTask(
  id: string,
  input: UpdateTaskInput,
): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

export async function getGitHubProfile(
  username: string,
): Promise<GitHubProfile> {
  return apiFetch<GitHubProfile>(`/github/${username}`);
}
