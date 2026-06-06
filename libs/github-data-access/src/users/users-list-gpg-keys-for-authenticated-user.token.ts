import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListGpgKeysForAuthenticatedUserParams =
  paths['/user/gpg_keys']['get']['parameters']['query'];

export type UsersListGpgKeysForAuthenticatedUserResponse =
  paths['/user/gpg_keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | UsersListGpgKeysForAuthenticatedUserParams
      | (() => UsersListGpgKeysForAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<UsersListGpgKeysForAuthenticatedUserResponse>
  >
>('USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER');

export function provideUsersListGpgKeysForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListGpgKeysForAuthenticatedUserParams
          | (() => UsersListGpgKeysForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<UsersListGpgKeysForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/gpg_keys`,
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
