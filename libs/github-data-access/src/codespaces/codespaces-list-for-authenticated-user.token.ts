import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesListForAuthenticatedUserParams =
  paths['/user/codespaces']['get']['parameters']['query'];

export type CodespacesListForAuthenticatedUserResponse =
  paths['/user/codespaces']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_LIST_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | CodespacesListForAuthenticatedUserParams
      | (() => CodespacesListForAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<CodespacesListForAuthenticatedUserResponse>
  >
>('CODESPACES_LIST_FOR_AUTHENTICATED_USER');

export function provideCodespacesListForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_LIST_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | CodespacesListForAuthenticatedUserParams
          | (() => CodespacesListForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<CodespacesListForAuthenticatedUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/user/codespaces`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
