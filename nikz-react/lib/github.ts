const GITHUB_USERNAME = 'NicollasRezende';
const GITHUB_API = 'https://api.github.com';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubRepo[] = await response.json();

    // Filter out forks and sort by stars/updates
    return data
      .filter((repo) => !repo.fork)
      .sort((a, b) => {
        // Prioritize repos with topics or stars
        const scoreA = (a.stargazers_count * 10) + (a.topics?.length || 0);
        const scoreB = (b.stargazers_count * 10) + (b.topics?.length || 0);
        return scoreB - scoreA;
      });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function getGitHubStats() {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}`,
      {
        next: { revalidate: 3600 },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}
