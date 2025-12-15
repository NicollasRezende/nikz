// lib/github.ts
import axios from "axios";
import { GitHubRepo } from "@/types";

const GITHUB_API_BASE = "https://api.github.com";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "NicollasRezende";

/**
 * Fetch all user repositories from GitHub API with pagination
 */
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    let allRepos: GitHubRepo[] = [];
    let page = 1;
    let hasMore = true;

    // Fetch all pages
    while (hasMore) {
      const response = await axios.get<GitHubRepo[]>(
        `${GITHUB_API_BASE}/users/${USERNAME}/repos`,
        {
          params: {
            sort: "updated",
            per_page: 100,
            page,
            type: "owner",
          },
        }
      );

      if (response.data.length === 0) {
        hasMore = false;
      } else {
        allRepos = [...allRepos, ...response.data];
        page++;

        // Safety limit to prevent infinite loops
        if (page > 10) hasMore = false;
      }
    }

    // Filter out only forks (keep repos even without descriptions)
    const filtered = allRepos.filter((repo) => !repo.fork);

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
