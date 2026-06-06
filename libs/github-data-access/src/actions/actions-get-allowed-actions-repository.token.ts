import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetAllowedActionsRepositoryResponse =
  paths['/repos/{owner}/{repo}/actions/permissions/selected-actions']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ALLOWED_ACTIONS_REPOSITORY = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<
    typeof httpResource<ActionsGetAllowedActionsRepositoryResponse>
  >
>('ACTIONS_GET_ALLOWED_ACTIONS_REPOSITORY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ActionsGetAllowedActionsRepositoryResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/permissions/selected-actions`,
      }));
  },
});
