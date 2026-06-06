import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_CHECK_COLLABORATOR = new InjectionToken<
  (
    owner: string,
    repo: string,
    username: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_CHECK_COLLABORATOR', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, username: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/collaborators/${username}`,
      }));
  },
});
