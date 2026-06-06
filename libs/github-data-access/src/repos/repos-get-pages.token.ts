import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetPagesResponse =
  paths['/repos/{owner}/{repo}/pages']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_PAGES = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetPagesResponse>>
>('REPOS_GET_PAGES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposGetPagesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pages`,
      }));
  },
});
