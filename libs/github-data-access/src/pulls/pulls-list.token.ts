import { InjectionToken, inject } from '@angular/core';
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
>('PULLS_LIST', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?: PullsListParams | (() => PullsListParams | undefined),
    ) =>
      httpResource<PullsListResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
