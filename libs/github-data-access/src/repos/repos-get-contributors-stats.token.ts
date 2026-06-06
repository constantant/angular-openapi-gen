import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetContributorsStatsResponse =
  paths['/repos/{owner}/{repo}/stats/contributors']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_CONTRIBUTORS_STATS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetContributorsStatsResponse>>
>('REPOS_GET_CONTRIBUTORS_STATS');

export function provideReposGetContributorsStats(): FactoryProvider {
  return {
    provide: REPOS_GET_CONTRIBUTORS_STATS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetContributorsStatsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/stats/contributors`,
        }));
    },
  };
}
