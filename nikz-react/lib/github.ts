const GITHUB_USERNAME = 'NicollasRezende';
const GITHUB_API = 'https://api.github.com';
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

// GITHUB_TOKEN is required for the real contribution calendar (incl. private repos).
// Use a *classic* personal access token with the `read:user` scope (add `repo` to be safe)
// at https://github.com/settings/tokens — fine-grained tokens don't expose contributionsCollection.
const token = process.env.GITHUB_TOKEN;
const GH_HEADERS: Record<string, string> = {
  'Accept': 'application/vnd.github.v3+json',
  ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
};

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

// Single cached fetch — both getGitHubRepos and getGitHubContributions share this
async function fetchAllRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
    { next: { revalidate: 21600 }, headers: GH_HEADERS }
  );
  if (!res.ok) throw new Error(`GitHub repos error: ${res.status}`);
  return res.json();
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const data = await fetchAllRepos();
    return data
      .filter((repo) => !repo.fork)
      .sort((a, b) => {
        const scoreA = (a.stargazers_count * 10) + (a.topics?.length || 0);
        const scoreB = (b.stargazers_count * 10) + (b.topics?.length || 0);
        return scoreB - scoreA;
      });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
}

// Real contribution calendar via GraphQL — identical to the graph on the profile.
// Includes commits to PRIVATE repos, plus PRs, issues and reviews, because the query
// runs as `viewer` (the token owner). Private contributions are always counted for the
// authenticated user regardless of the public "private contributions" profile setting.
const CONTRIBUTIONS_QUERY = `
  query($from: DateTime!, $to: DateTime!) {
    viewer {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

interface GraphQLContributionDay {
  date: string;
  contributionCount: number;
}

async function fetchContributionsGraphQL(): Promise<ContributionDay[] | null> {
  if (!token) return null; // GraphQL requires authentication

  const to = new Date();
  const from = new Date();
  from.setFullYear(from.getFullYear() - 1);

  const res = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { from: from.toISOString(), to: to.toISOString() },
    }),
    next: { revalidate: 21600 },
  });

  if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`GitHub GraphQL: ${json.errors[0].message}`);
  }

  const weeks: { contributionDays: GraphQLContributionDay[] }[] =
    json.data?.viewer?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  return weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => ({ date: d.date, count: d.contributionCount }));
}

// Fallback: count public commits via REST (no private repos, no PRs/issues).
async function fetchContributionsREST(): Promise<ContributionDay[]> {
  const since = new Date();
  since.setFullYear(since.getFullYear() - 1);
  const sinceISO = since.toISOString();

  // Reuse the same repo list already cached by getGitHubRepos
  const allRepos = await fetchAllRepos();
  const activeRepos = allRepos
    .filter((r) => !r.fork && r.pushed_at >= sinceISO)
    .map((r) => r.name)
    .slice(0, 20); // cap at 20 repos to stay within rate limit

  // Fetch commits from each active repo in parallel — 1 page each (100 commits)
  const countByDay: Record<string, number> = {};

  await Promise.allSettled(
    activeRepos.map(async (repo) => {
      const res = await fetch(
        `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo}/commits?author=${GITHUB_USERNAME}&since=${sinceISO}&per_page=100`,
        { next: { revalidate: 21600 }, headers: GH_HEADERS }
      );
      if (!res.ok) return;
      const commits: { commit: { author: { date: string } } }[] = await res.json();
      for (const c of commits) {
        const day = c.commit.author.date.slice(0, 10);
        countByDay[day] = (countByDay[day] || 0) + 1;
      }
    })
  );

  // Build 53-week grid (371 days) ending today
  const today = new Date();
  const days: ContributionDay[] = [];
  for (let i = 370; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    days.push({ date, count: countByDay[date] ?? 0 });
  }

  return days;
}

export async function getGitHubContributions(): Promise<ContributionDay[]> {
  try {
    // Prefer the real calendar (private repos included); fall back to public commits.
    const graphql = await fetchContributionsGraphQL();
    if (graphql?.length) return graphql;
    return await fetchContributionsREST();
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    try {
      return await fetchContributionsREST();
    } catch {
      return [];
    }
  }
}

export async function getGitHubStats() {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}`,
      { next: { revalidate: 21600 }, headers: GH_HEADERS }
    );
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
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
