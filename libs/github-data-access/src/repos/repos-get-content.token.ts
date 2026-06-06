import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetContentParams =
  paths['/repos/{owner}/{repo}/contents/{path}']['get']['parameters']['query'];

export type ReposGetContentResponse =
  paths['/repos/{owner}/{repo}/contents/{path}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_CONTENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    path: string,
    params?: ReposGetContentParams | (() => ReposGetContentParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetContentResponse>>
>('REPOS_GET_CONTENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      path: string,
      params?:
        | ReposGetContentParams
        | (() => ReposGetContentParams | undefined),
    ) =>
      httpResource<ReposGetContentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/contents/${path}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
