import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListWatchersForRepoParams =
  paths['/repos/{owner}/{repo}/subscribers']['get']['parameters']['query'];

export type ActivityListWatchersForRepoResponse =
  paths['/repos/{owner}/{repo}/subscribers']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_WATCHERS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActivityListWatchersForRepoParams
      | (() => ActivityListWatchersForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<ActivityListWatchersForRepoResponse>>
>('ACTIVITY_LIST_WATCHERS_FOR_REPO');

export function provideActivityListWatchersForRepo(): FactoryProvider {
  return {
    provide: ACTIVITY_LIST_WATCHERS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ActivityListWatchersForRepoParams
          | (() => ActivityListWatchersForRepoParams | undefined),
      ) =>
        httpResource<ActivityListWatchersForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/subscribers`,
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
