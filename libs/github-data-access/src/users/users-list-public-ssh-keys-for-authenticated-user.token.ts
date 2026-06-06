import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListPublicSshKeysForAuthenticatedUserParams =
  paths['/user/keys']['get']['parameters']['query'];

export type UsersListPublicSshKeysForAuthenticatedUserResponse =
  paths['/user/keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | UsersListPublicSshKeysForAuthenticatedUserParams
        | (() => UsersListPublicSshKeysForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<UsersListPublicSshKeysForAuthenticatedUserResponse>
    >
  >('USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER');

export function provideUsersListPublicSshKeysForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListPublicSshKeysForAuthenticatedUserParams
          | (() =>
              | UsersListPublicSshKeysForAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<UsersListPublicSshKeysForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/keys`,
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
