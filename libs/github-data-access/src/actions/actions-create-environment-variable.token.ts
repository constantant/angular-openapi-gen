import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateEnvironmentVariableBody = NonNullable<
  paths['/repos/{owner}/{repo}/environments/{environment_name}/variables']['post']['requestBody']
>['content']['application/json'];

export type ActionsCreateEnvironmentVariableResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/variables']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_ENVIRONMENT_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    body:
      | ActionsCreateEnvironmentVariableBody
      | Signal<ActionsCreateEnvironmentVariableBody>,
  ) => ReturnType<typeof httpResource<ActionsCreateEnvironmentVariableResponse>>
>('ACTIONS_CREATE_ENVIRONMENT_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environmentName: string,
      body:
        | ActionsCreateEnvironmentVariableBody
        | Signal<ActionsCreateEnvironmentVariableBody>,
    ) =>
      httpResource<ActionsCreateEnvironmentVariableResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/variables`,
        method: 'POST',
        body,
      }));
  },
});
