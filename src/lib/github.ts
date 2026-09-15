export interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

const USER = 'sugardrone';

export async function getRepos(limit = 6): Promise<Repo[]> {
  const headers: Record<string, string> = {
    'User-Agent': 'saulgoodmom-blog',
    Accept: 'application/vnd.github+json',
  };
  const token = import.meta.env.GITHUB_TOKEN as string | undefined;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?sort=pushed&per_page=100`,
      { headers },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Repo[];
    return data
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit);
  } catch {
    return [];
  }
}
