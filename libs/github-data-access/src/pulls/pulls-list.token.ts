import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsListParams =
  paths['/repos/{owner}/{repo}/pulls']['get']['parameters']['query'];

export type PullsListResponse =
  paths['/repos/{owner}/{repo}/pulls']['get']['responses']['200']['content']['application/json'];

export const PULLS_LIST = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: PullsListParams | (() => PullsListParams | undefined),
  ) => ReturnType<typeof httpResource<PullsListResponse>>
>('PULLS_LIST');

export function providePullsList(): FactoryProvider {
  return {
    provide: PULLS_LIST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?: PullsListParams | (() => PullsListParams | undefined),
      ) =>
        httpResource<PullsListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/pulls`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
