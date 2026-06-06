import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersDeleteEmailForAuthenticatedUserBody = NonNullable<
  paths['/user/emails']['delete']['requestBody']
>['content']['application/json'];

export const USERS_DELETE_EMAIL_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    body:
      | UsersDeleteEmailForAuthenticatedUserBody
      | Signal<UsersDeleteEmailForAuthenticatedUserBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('USERS_DELETE_EMAIL_FOR_AUTHENTICATED_USER');

export function provideUsersDeleteEmailForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_DELETE_EMAIL_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | UsersDeleteEmailForAuthenticatedUserBody
          | Signal<UsersDeleteEmailForAuthenticatedUserBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/emails`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
