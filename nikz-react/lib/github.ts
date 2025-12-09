// lib/github.ts
import axios from "axios";
import { GitHubRepo } from "@/types";

const GITHUB_API_BASE = "https://api.github.com";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "NicollasRezende";

/**
 * Fetch user repositories from GitHub API
 */
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await axios.get<GitHubRepo[]>(
      `${GITHUB_API_BASE}/users/${USERNAME}/repos`,
      {
        params: {
          sort: "updated",
          per_page: 30,
          type: "owner",
        },
      }
    );

    // Filter out forks and repos without descriptions
    const filtered = response.data.filter(
      (repo) => !repo.fork && repo.description
    );

    return filtered;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

/**
 * Get unique languages from repos
 */
export function getUniqueLanguages(repos: GitHubRepo[]): string[] {
  const languages = repos
    .map((repo) => repo.language)
    .filter((lang): lang is string => lang !== null);

  return Array.from(new Set(languages)).sort();
}
