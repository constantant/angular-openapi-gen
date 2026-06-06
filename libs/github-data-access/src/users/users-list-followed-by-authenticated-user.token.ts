import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListFollowedByAuthenticatedUserParams =
  paths['/user/following']['get']['parameters']['query'];

export type UsersListFollowedByAuthenticatedUserResponse =
  paths['/user/following']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | UsersListFollowedByAuthenticatedUserParams
      | (() => UsersListFollowedByAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<UsersListFollowedByAuthenticatedUserResponse>
  >
>('USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER');

export function provideUsersListFollowedByAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListFollowedByAuthenticatedUserParams
          | (() => UsersListFollowedByAuthenticatedUserParams | undefined),
      ) =>
        httpResource<UsersListFollowedByAuthenticatedUserResponse>(() => ({
          url: `${base}/user/following`,
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
