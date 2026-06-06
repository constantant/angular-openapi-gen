import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesCreateOrUpdateSecretForAuthenticatedUserBody =
  NonNullable<
    paths['/user/codespaces/secrets/{secret_name}']['put']['requestBody']
  >['content']['application/json'];

export type CodespacesCreateOrUpdateSecretForAuthenticatedUserResponse =
  paths['/user/codespaces/secrets/{secret_name}']['put']['responses']['201']['content']['application/json'];

export const CODESPACES_CREATE_OR_UPDATE_SECRET_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      secretName: string,
      body:
        | CodespacesCreateOrUpdateSecretForAuthenticatedUserBody
        | Signal<CodespacesCreateOrUpdateSecretForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<CodespacesCreateOrUpdateSecretForAuthenticatedUserResponse>
    >
  >('CODESPACES_CREATE_OR_UPDATE_SECRET_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        secretName: string,
        body:
          | CodespacesCreateOrUpdateSecretForAuthenticatedUserBody
          | Signal<CodespacesCreateOrUpdateSecretForAuthenticatedUserBody>,
      ) =>
        httpResource<CodespacesCreateOrUpdateSecretForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/codespaces/secrets/${secretName}`,
            method: 'PUT',
            body,
          }),
        );
    },
  });
