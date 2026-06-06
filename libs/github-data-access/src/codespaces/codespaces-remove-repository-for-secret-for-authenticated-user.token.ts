import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const CODESPACES_REMOVE_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      secretName: string,
      repositoryId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('CODESPACES_REMOVE_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER');

export function provideCodespacesRemoveRepositoryForSecretForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_REMOVE_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (secretName: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/codespaces/secrets/${secretName}/repositories/${repositoryId}`,
          method: 'DELETE',
        }));
    },
  };
}
