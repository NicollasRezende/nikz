"use client";

import { useState, useEffect } from 'react';
import { getGitHubRepos, GitHubRepo } from '@/lib/github';

export function useGitHub() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        const data = await getGitHubRepos();
        setRepos(data);
      } catch (err) {
        setError('Failed to load GitHub repositories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return { repos, loading, error };
}
