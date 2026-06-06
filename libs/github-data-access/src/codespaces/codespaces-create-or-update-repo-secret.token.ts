import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesCreateOrUpdateRepoSecretBody = NonNullable<
  paths['/repos/{owner}/{repo}/codespaces/secrets/{secret_name}']['put']['requestBody']
>['content']['application/json'];

export type CodespacesCreateOrUpdateRepoSecretResponse =
  paths['/repos/{owner}/{repo}/codespaces/secrets/{secret_name}']['put']['responses']['201']['content']['application/json'];

export const CODESPACES_CREATE_OR_UPDATE_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
    body:
      | CodespacesCreateOrUpdateRepoSecretBody
      | Signal<CodespacesCreateOrUpdateRepoSecretBody>,
  ) => ReturnType<
    typeof httpResource<CodespacesCreateOrUpdateRepoSecretResponse>
  >
>('CODESPACES_CREATE_OR_UPDATE_REPO_SECRET');

export function provideCodespacesCreateOrUpdateRepoSecret(): FactoryProvider {
  return {
    provide: CODESPACES_CREATE_OR_UPDATE_REPO_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        secretName: string,
        body:
          | CodespacesCreateOrUpdateRepoSecretBody
          | Signal<CodespacesCreateOrUpdateRepoSecretBody>,
      ) =>
        httpResource<CodespacesCreateOrUpdateRepoSecretResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/codespaces/secrets/${secretName}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
