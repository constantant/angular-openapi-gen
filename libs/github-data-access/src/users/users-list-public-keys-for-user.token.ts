import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListPublicKeysForUserParams =
  paths['/users/{username}/keys']['get']['parameters']['query'];

export type UsersListPublicKeysForUserResponse =
  paths['/users/{username}/keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_PUBLIC_KEYS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | UsersListPublicKeysForUserParams
      | (() => UsersListPublicKeysForUserParams | undefined),
  ) => ReturnType<typeof httpResource<UsersListPublicKeysForUserResponse>>
>('USERS_LIST_PUBLIC_KEYS_FOR_USER');

export function provideUsersListPublicKeysForUser(): FactoryProvider {
  return {
    provide: USERS_LIST_PUBLIC_KEYS_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | UsersListPublicKeysForUserParams
          | (() => UsersListPublicKeysForUserParams | undefined),
      ) =>
        httpResource<UsersListPublicKeysForUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/users/${username}/keys`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
