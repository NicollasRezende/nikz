import { getGitHubRepos, GitHubRepo } from './github';

// Server-side function to fetch repos
export async function getRepos(): Promise<GitHubRepo[]> {
  'use server';
  return await getGitHubRepos();
}
