"use client";

import { useState } from "react";
import Image from "next/image";
import type { GitHubProfile } from "@/src/types";
import { getGitHubProfile } from "@/src/lib/api";

export default function GitHubLookup() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setProfile(null);

    try {
      const data = await getGitHubProfile(trimmed);
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2" role="search">
        <label htmlFor="github-username" className="sr-only">
          GitHub username
        </label>
        <input
          id="github-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
          aria-label="GitHub username"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-6" aria-label="Loading profile">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600" />
        </div>
      )}

      {profile && !loading && (
        <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-start dark:border-zinc-800 dark:bg-zinc-900">
          <Image
            src={profile.avatarUrl}
            alt={`${profile.login}'s GitHub avatar`}
            width={80}
            height={80}
            className="rounded-full shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {profile.name ?? profile.login}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              @{profile.login}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <span>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  {profile.publicRepos}
                </strong>{" "}
                repos
              </span>
              <span>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  {profile.followers}
                </strong>{" "}
                followers
              </span>
              <span>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  {profile.following}
                </strong>{" "}
                following
              </span>
            </div>

            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
