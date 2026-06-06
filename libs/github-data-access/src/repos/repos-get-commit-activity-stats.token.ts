import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCommitActivityStatsResponse =
  paths['/repos/{owner}/{repo}/stats/commit_activity']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_COMMIT_ACTIVITY_STATS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetCommitActivityStatsResponse>>
>('REPOS_GET_COMMIT_ACTIVITY_STATS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposGetCommitActivityStatsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/stats/commit_activity`,
      }));
  },
});
