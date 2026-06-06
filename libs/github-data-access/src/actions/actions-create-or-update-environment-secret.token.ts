import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateOrUpdateEnvironmentSecretBody = NonNullable<
  paths['/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}']['put']['requestBody']
>['content']['application/json'];

export type ActionsCreateOrUpdateEnvironmentSecretResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}']['put']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_OR_UPDATE_ENVIRONMENT_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    secretName: string,
    body:
      | ActionsCreateOrUpdateEnvironmentSecretBody
      | Signal<ActionsCreateOrUpdateEnvironmentSecretBody>,
  ) => ReturnType<
    typeof httpResource<ActionsCreateOrUpdateEnvironmentSecretResponse>
  >
>('ACTIONS_CREATE_OR_UPDATE_ENVIRONMENT_SECRET');

export function provideActionsCreateOrUpdateEnvironmentSecret(): FactoryProvider {
  return {
    provide: ACTIONS_CREATE_OR_UPDATE_ENVIRONMENT_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        environmentName: string,
        secretName: string,
        body:
          | ActionsCreateOrUpdateEnvironmentSecretBody
          | Signal<ActionsCreateOrUpdateEnvironmentSecretBody>,
      ) =>
        httpResource<ActionsCreateOrUpdateEnvironmentSecretResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/secrets/${secretName}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
