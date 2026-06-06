import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesListRepositoriesForSecretForAuthenticatedUserResponse =
  paths['/user/codespaces/secrets/{secret_name}/repositories']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_LIST_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      secretName: string,
    ) => ReturnType<
      typeof httpResource<CodespacesListRepositoriesForSecretForAuthenticatedUserResponse>
    >
  >('CODESPACES_LIST_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER');

export function provideCodespacesListRepositoriesForSecretForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_LIST_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (secretName: string) =>
        httpResource<CodespacesListRepositoriesForSecretForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/codespaces/secrets/${secretName}/repositories`,
          }),
        );
    },
  };
}
