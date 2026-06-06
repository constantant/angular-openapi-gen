import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListBlockedByAuthenticatedUserParams =
  paths['/user/blocks']['get']['parameters']['query'];

export type UsersListBlockedByAuthenticatedUserResponse =
  paths['/user/blocks']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | UsersListBlockedByAuthenticatedUserParams
      | (() => UsersListBlockedByAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<UsersListBlockedByAuthenticatedUserResponse>
  >
>('USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER');

export function provideUsersListBlockedByAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListBlockedByAuthenticatedUserParams
          | (() => UsersListBlockedByAuthenticatedUserParams | undefined),
      ) =>
        httpResource<UsersListBlockedByAuthenticatedUserResponse>(() => ({
          url: `${base}/user/blocks`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
