import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListAutolinksResponse =
  paths['/repos/{owner}/{repo}/autolinks']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_AUTOLINKS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposListAutolinksResponse>>
>('REPOS_LIST_AUTOLINKS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposListAutolinksResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/autolinks`,
      }));
  },
});
