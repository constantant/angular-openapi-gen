import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListPublicEmailsForAuthenticatedUserParams =
  paths['/user/public_emails']['get']['parameters']['query'];

export type UsersListPublicEmailsForAuthenticatedUserResponse =
  paths['/user/public_emails']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | UsersListPublicEmailsForAuthenticatedUserParams
        | (() => UsersListPublicEmailsForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<UsersListPublicEmailsForAuthenticatedUserResponse>
    >
  >('USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER');

export function provideUsersListPublicEmailsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListPublicEmailsForAuthenticatedUserParams
          | (() => UsersListPublicEmailsForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<UsersListPublicEmailsForAuthenticatedUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/user/public_emails`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
