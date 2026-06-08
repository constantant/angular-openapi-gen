import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListSshSigningKeysForUserParams =
  paths['/users/{username}/ssh_signing_keys']['get']['parameters']['query'];

export type UsersListSshSigningKeysForUserResponse =
  paths['/users/{username}/ssh_signing_keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_SSH_SIGNING_KEYS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | UsersListSshSigningKeysForUserParams
      | (() => UsersListSshSigningKeysForUserParams | undefined),
  ) => ReturnType<typeof httpResource<UsersListSshSigningKeysForUserResponse>>
>('USERS_LIST_SSH_SIGNING_KEYS_FOR_USER');

export function provideUsersListSshSigningKeysForUser(): FactoryProvider {
  return {
    provide: USERS_LIST_SSH_SIGNING_KEYS_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | UsersListSshSigningKeysForUserParams
          | (() => UsersListSshSigningKeysForUserParams | undefined),
      ) =>
        httpResource<UsersListSshSigningKeysForUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/users/${username}/ssh_signing_keys`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
