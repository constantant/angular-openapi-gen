import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListFollowersForUserParams =
  paths['/users/{username}/followers']['get']['parameters']['query'];

export type UsersListFollowersForUserResponse =
  paths['/users/{username}/followers']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_FOLLOWERS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | UsersListFollowersForUserParams
      | (() => UsersListFollowersForUserParams | undefined),
  ) => ReturnType<typeof httpResource<UsersListFollowersForUserResponse>>
>('USERS_LIST_FOLLOWERS_FOR_USER');

export function provideUsersListFollowersForUser(): FactoryProvider {
  return {
    provide: USERS_LIST_FOLLOWERS_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | UsersListFollowersForUserParams
          | (() => UsersListFollowersForUserParams | undefined),
      ) =>
        httpResource<UsersListFollowersForUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/users/${username}/followers`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
