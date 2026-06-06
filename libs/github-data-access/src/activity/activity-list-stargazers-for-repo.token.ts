import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListStargazersForRepoParams =
  paths['/repos/{owner}/{repo}/stargazers']['get']['parameters']['query'];

export type ActivityListStargazersForRepoResponse =
  paths['/repos/{owner}/{repo}/stargazers']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_STARGAZERS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActivityListStargazersForRepoParams
      | (() => ActivityListStargazersForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<ActivityListStargazersForRepoResponse>>
>('ACTIVITY_LIST_STARGAZERS_FOR_REPO');

export function provideActivityListStargazersForRepo(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_STARGAZERS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ActivityListStargazersForRepoParams
          | (() => ActivityListStargazersForRepoParams | undefined),
      ) =>
        httpResource<ActivityListStargazersForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/stargazers`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
