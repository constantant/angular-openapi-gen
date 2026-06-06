import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateRemoveTokenForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runners/remove-token']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_REMOVE_TOKEN_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ActionsCreateRemoveTokenForRepoResponse>>
>('ACTIONS_CREATE_REMOVE_TOKEN_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ActionsCreateRemoveTokenForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runners/remove-token`,
        method: 'POST',
      }));
  },
});
