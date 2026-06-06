import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetPagesBuildResponse =
  paths['/repos/{owner}/{repo}/pages/builds/{build_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_PAGES_BUILD = new InjectionToken<
  (
    owner: string,
    repo: string,
    buildId: string,
  ) => ReturnType<typeof httpResource<ReposGetPagesBuildResponse>>
>('REPOS_GET_PAGES_BUILD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, buildId: string) =>
      httpResource<ReposGetPagesBuildResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pages/builds/${buildId}`,
      }));
  },
});
