import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody =
  NonNullable<
    paths['/user/email/visibility']['patch']['requestBody']
  >['content']['application/json'];

export type UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse =
  paths['/user/email/visibility']['patch']['responses']['200']['content']['application/json'];

export const USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body:
        | UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody
        | Signal<UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse>
    >
  >('USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER');

export function provideUsersSetPrimaryEmailVisibilityForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody
          | Signal<UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody>,
      ) =>
        httpResource<UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/email/visibility`,
            method: 'PATCH',
            body,
          }),
        );
    },
  };
}
