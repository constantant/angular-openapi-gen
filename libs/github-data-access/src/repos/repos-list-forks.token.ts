import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListForksParams =
  paths['/repos/{owner}/{repo}/forks']['get']['parameters']['query'];

export type ReposListForksResponse =
  paths['/repos/{owner}/{repo}/forks']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_FORKS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListForksParams | (() => ReposListForksParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListForksResponse>>
>('REPOS_LIST_FORKS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?: ReposListForksParams | (() => ReposListForksParams | undefined),
    ) =>
      httpResource<ReposListForksResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/forks`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
