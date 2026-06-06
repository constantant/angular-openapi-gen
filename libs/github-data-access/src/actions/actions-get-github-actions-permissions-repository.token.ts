import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetGithubActionsPermissionsRepositoryResponse =
  paths['/repos/{owner}/{repo}/actions/permissions']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetGithubActionsPermissionsRepositoryResponse>
    >
  >('ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_REPOSITORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsGetGithubActionsPermissionsRepositoryResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/permissions`,
          }),
        );
    },
  });
