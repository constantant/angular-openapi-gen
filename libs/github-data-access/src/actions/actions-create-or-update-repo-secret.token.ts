import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateOrUpdateRepoSecretBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/secrets/{secret_name}']['put']['requestBody']
>['content']['application/json'];

export type ActionsCreateOrUpdateRepoSecretResponse =
  paths['/repos/{owner}/{repo}/actions/secrets/{secret_name}']['put']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_OR_UPDATE_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
    body:
      | ActionsCreateOrUpdateRepoSecretBody
      | Signal<ActionsCreateOrUpdateRepoSecretBody>,
  ) => ReturnType<typeof httpResource<ActionsCreateOrUpdateRepoSecretResponse>>
>('ACTIONS_CREATE_OR_UPDATE_REPO_SECRET');

export function provideActionsCreateOrUpdateRepoSecret(): FactoryProvider {
  return {
    provide: ACTIONS_CREATE_OR_UPDATE_REPO_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        secretName: string,
        body:
          | ActionsCreateOrUpdateRepoSecretBody
          | Signal<ActionsCreateOrUpdateRepoSecretBody>,
      ) =>
        httpResource<ActionsCreateOrUpdateRepoSecretResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/secrets/${secretName}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
