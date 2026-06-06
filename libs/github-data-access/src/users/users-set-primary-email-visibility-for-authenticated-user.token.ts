import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody = NonNullable<
  paths['/user/email/visibility']['patch']['requestBody']
>['content']['application/json'];

type UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse =
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
  >('USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
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
  });
