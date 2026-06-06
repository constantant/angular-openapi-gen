import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetLatestPagesBuildResponse =
  paths['/repos/{owner}/{repo}/pages/builds/latest']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_LATEST_PAGES_BUILD = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetLatestPagesBuildResponse>>
>('REPOS_GET_LATEST_PAGES_BUILD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposGetLatestPagesBuildResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pages/builds/latest`,
      }));
  },
});
