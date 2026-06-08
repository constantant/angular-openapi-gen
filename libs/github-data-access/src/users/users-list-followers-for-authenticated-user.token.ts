import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListFollowersForAuthenticatedUserParams =
  paths['/user/followers']['get']['parameters']['query'];

export type UsersListFollowersForAuthenticatedUserResponse =
  paths['/user/followers']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | UsersListFollowersForAuthenticatedUserParams
      | (() => UsersListFollowersForAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<UsersListFollowersForAuthenticatedUserResponse>
  >
>('USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER');

export function provideUsersListFollowersForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListFollowersForAuthenticatedUserParams
          | (() => UsersListFollowersForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<UsersListFollowersForAuthenticatedUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/user/followers`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
