import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesListSecretsForAuthenticatedUserParams =
  paths['/user/codespaces/secrets']['get']['parameters']['query'];

export type CodespacesListSecretsForAuthenticatedUserResponse =
  paths['/user/codespaces/secrets']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_LIST_SECRETS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | CodespacesListSecretsForAuthenticatedUserParams
        | (() => CodespacesListSecretsForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<CodespacesListSecretsForAuthenticatedUserResponse>
    >
  >('CODESPACES_LIST_SECRETS_FOR_AUTHENTICATED_USER');

export function provideCodespacesListSecretsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_LIST_SECRETS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | CodespacesListSecretsForAuthenticatedUserParams
          | (() => CodespacesListSecretsForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<CodespacesListSecretsForAuthenticatedUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/user/codespaces/secrets`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
