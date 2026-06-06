import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetViewsParams =
  paths['/repos/{owner}/{repo}/traffic/views']['get']['parameters']['query'];

export type ReposGetViewsResponse =
  paths['/repos/{owner}/{repo}/traffic/views']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_VIEWS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposGetViewsParams | (() => ReposGetViewsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetViewsResponse>>
>('REPOS_GET_VIEWS');

export function provideReposGetViews(): FactoryProvider {
  return {
    provide: REPOS_GET_VIEWS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?: ReposGetViewsParams | (() => ReposGetViewsParams | undefined),
      ) =>
        httpResource<ReposGetViewsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/traffic/views`,
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
