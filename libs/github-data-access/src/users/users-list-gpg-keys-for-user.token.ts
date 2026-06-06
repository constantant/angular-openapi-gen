import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListGpgKeysForUserParams =
  paths['/users/{username}/gpg_keys']['get']['parameters']['query'];

export type UsersListGpgKeysForUserResponse =
  paths['/users/{username}/gpg_keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_GPG_KEYS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | UsersListGpgKeysForUserParams
      | (() => UsersListGpgKeysForUserParams | undefined),
  ) => ReturnType<typeof httpResource<UsersListGpgKeysForUserResponse>>
>('USERS_LIST_GPG_KEYS_FOR_USER');

export function provideUsersListGpgKeysForUser(): FactoryProvider {
  return {
    provide: USERS_LIST_GPG_KEYS_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | UsersListGpgKeysForUserParams
          | (() => UsersListGpgKeysForUserParams | undefined),
      ) =>
        httpResource<UsersListGpgKeysForUserResponse>(() => ({
          url: `${base}/users/${username}/gpg_keys`,
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
