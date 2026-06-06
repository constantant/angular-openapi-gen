import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCodeFrequencyStatsResponse =
  paths['/repos/{owner}/{repo}/stats/code_frequency']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_CODE_FREQUENCY_STATS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetCodeFrequencyStatsResponse>>
>('REPOS_GET_CODE_FREQUENCY_STATS');

export function provideReposGetCodeFrequencyStats(): FactoryProvider {
  return {
    provide: REPOS_GET_CODE_FREQUENCY_STATS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetCodeFrequencyStatsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/stats/code_frequency`,
        }));
    },
  };
}
