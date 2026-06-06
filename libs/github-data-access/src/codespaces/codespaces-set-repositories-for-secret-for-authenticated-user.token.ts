import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesSetRepositoriesForSecretForAuthenticatedUserBody =
  NonNullable<
    paths['/user/codespaces/secrets/{secret_name}/repositories']['put']['requestBody']
  >['content']['application/json'];

export const CODESPACES_SET_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      secretName: string,
      body:
        | CodespacesSetRepositoriesForSecretForAuthenticatedUserBody
        | Signal<CodespacesSetRepositoriesForSecretForAuthenticatedUserBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('CODESPACES_SET_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        secretName: string,
        body:
          | CodespacesSetRepositoriesForSecretForAuthenticatedUserBody
          | Signal<CodespacesSetRepositoriesForSecretForAuthenticatedUserBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/codespaces/secrets/${secretName}/repositories`,
          method: 'PUT',
          body,
        }));
    },
  });
