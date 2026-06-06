import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetGithubActionsPermissionsRepositoryBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/permissions']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      body:
        | ActionsSetGithubActionsPermissionsRepositoryBody
        | Signal<ActionsSetGithubActionsPermissionsRepositoryBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_REPOSITORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActionsSetGithubActionsPermissionsRepositoryBody
          | Signal<ActionsSetGithubActionsPermissionsRepositoryBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/permissions`,
          method: 'PUT',
          body,
        }));
    },
  });
