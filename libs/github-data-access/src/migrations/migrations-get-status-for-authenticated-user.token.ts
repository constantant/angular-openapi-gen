import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsGetStatusForAuthenticatedUserParams =
  paths['/user/migrations/{migration_id}']['get']['parameters']['query'];

export type MigrationsGetStatusForAuthenticatedUserResponse =
  paths['/user/migrations/{migration_id}']['get']['responses']['200']['content']['application/json'];

export const MIGRATIONS_GET_STATUS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    migrationId: string,
    params?:
      | MigrationsGetStatusForAuthenticatedUserParams
      | (() => MigrationsGetStatusForAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<MigrationsGetStatusForAuthenticatedUserResponse>
  >
>('MIGRATIONS_GET_STATUS_FOR_AUTHENTICATED_USER');

export function provideMigrationsGetStatusForAuthenticatedUser(): FactoryProvider {
  return {
    provide: MIGRATIONS_GET_STATUS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        migrationId: string,
        params?:
          | MigrationsGetStatusForAuthenticatedUserParams
          | (() => MigrationsGetStatusForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<MigrationsGetStatusForAuthenticatedUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/user/migrations/${migrationId}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
