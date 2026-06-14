import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
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
>('ACTIONS_CREATE_ENVIRONMENT_VARIABLE');

export function provideActionsCreateEnvironmentVariable(): FactoryProvider {
  return {
    provide: ACTIONS_CREATE_ENVIRONMENT_VARIABLE,
    useFactory: () => {
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
  };
}
