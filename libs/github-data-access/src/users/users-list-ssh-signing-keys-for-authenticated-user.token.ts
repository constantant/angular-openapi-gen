import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListSshSigningKeysForAuthenticatedUserParams =
  paths['/user/ssh_signing_keys']['get']['parameters']['query'];

export type UsersListSshSigningKeysForAuthenticatedUserResponse =
  paths['/user/ssh_signing_keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_SSH_SIGNING_KEYS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | UsersListSshSigningKeysForAuthenticatedUserParams
        | (() => UsersListSshSigningKeysForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<UsersListSshSigningKeysForAuthenticatedUserResponse>
    >
  >('USERS_LIST_SSH_SIGNING_KEYS_FOR_AUTHENTICATED_USER');

export function provideUsersListSshSigningKeysForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_SSH_SIGNING_KEYS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListSshSigningKeysForAuthenticatedUserParams
          | (() =>
              | UsersListSshSigningKeysForAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<UsersListSshSigningKeysForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/ssh_signing_keys`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
