import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetTopPathsResponse =
  paths['/repos/{owner}/{repo}/traffic/popular/paths']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_TOP_PATHS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetTopPathsResponse>>
>('REPOS_GET_TOP_PATHS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposGetTopPathsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/traffic/popular/paths`,
      }));
  },
});
