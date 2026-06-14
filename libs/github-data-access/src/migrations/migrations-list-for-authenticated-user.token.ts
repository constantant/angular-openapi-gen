import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsListForAuthenticatedUserParams =
  paths['/user/migrations']['get']['parameters']['query'];

export type MigrationsListForAuthenticatedUserResponse =
  paths['/user/migrations']['get']['responses']['200']['content']['application/json'];

export const MIGRATIONS_LIST_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | MigrationsListForAuthenticatedUserParams
      | (() => MigrationsListForAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<MigrationsListForAuthenticatedUserResponse>
  >
>('MIGRATIONS_LIST_FOR_AUTHENTICATED_USER');

export function provideMigrationsListForAuthenticatedUser(): FactoryProvider {
  return {
    provide: MIGRATIONS_LIST_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | MigrationsListForAuthenticatedUserParams
          | (() => MigrationsListForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<MigrationsListForAuthenticatedUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/user/migrations`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
