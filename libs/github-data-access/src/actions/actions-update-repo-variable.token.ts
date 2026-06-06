import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsUpdateRepoVariableBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/variables/{name}']['patch']['requestBody']
>['content']['application/json'];

export const ACTIONS_UPDATE_REPO_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    name: string,
    body: ActionsUpdateRepoVariableBody | Signal<ActionsUpdateRepoVariableBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_UPDATE_REPO_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      name: string,
      body:
        | ActionsUpdateRepoVariableBody
        | Signal<ActionsUpdateRepoVariableBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/variables/${name}`,
        method: 'PATCH',
        body,
      }));
  },
});
