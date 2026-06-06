import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetContentParams =
  paths['/repos/{owner}/{repo}/contents/{path}']['get']['parameters']['query'];

type ReposGetContentResponse =
  paths['/repos/{owner}/{repo}/contents/{path}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_CONTENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    path: string,
    params?: ReposGetContentParams,
  ) => ReturnType<typeof httpResource<ReposGetContentResponse>>
>('REPOS_GET_CONTENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      path: string,
      params?: ReposGetContentParams,
    ) =>
      httpResource<ReposGetContentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/contents/${path}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
