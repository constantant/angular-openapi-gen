import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsUpdateEnvironmentVariableBody = NonNullable<
  paths['/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}']['patch']['requestBody']
>['content']['application/json'];

export const ACTIONS_UPDATE_ENVIRONMENT_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    name: string,
    environmentName: string,
    body:
      | ActionsUpdateEnvironmentVariableBody
      | Signal<ActionsUpdateEnvironmentVariableBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_UPDATE_ENVIRONMENT_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      name: string,
      environmentName: string,
      body:
        | ActionsUpdateEnvironmentVariableBody
        | Signal<ActionsUpdateEnvironmentVariableBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/variables/${name}`,
        method: 'PATCH',
        body,
      }));
  },
});
