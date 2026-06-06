import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetViewsParams =
  paths['/repos/{owner}/{repo}/traffic/views']['get']['parameters']['query'];

type ReposGetViewsResponse =
  paths['/repos/{owner}/{repo}/traffic/views']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_VIEWS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposGetViewsParams,
  ) => ReturnType<typeof httpResource<ReposGetViewsResponse>>
>('REPOS_GET_VIEWS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, params?: ReposGetViewsParams) =>
      httpResource<ReposGetViewsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/traffic/views`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
