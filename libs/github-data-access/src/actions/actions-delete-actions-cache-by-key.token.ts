import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsDeleteActionsCacheByKeyResponse =
  paths['/repos/{owner}/{repo}/actions/caches']['delete']['responses']['200']['content']['application/json'];

export const ACTIONS_DELETE_ACTIONS_CACHE_BY_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ActionsDeleteActionsCacheByKeyResponse>>
>('ACTIONS_DELETE_ACTIONS_CACHE_BY_KEY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ActionsDeleteActionsCacheByKeyResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/caches`,
        method: 'DELETE',
      }));
  },
});
