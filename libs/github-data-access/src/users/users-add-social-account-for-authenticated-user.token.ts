import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersAddSocialAccountForAuthenticatedUserBody = NonNullable<
  paths['/user/social_accounts']['post']['requestBody']
>['content']['application/json'];

type UsersAddSocialAccountForAuthenticatedUserResponse =
  paths['/user/social_accounts']['post']['responses']['201']['content']['application/json'];

export const USERS_ADD_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body:
        | UsersAddSocialAccountForAuthenticatedUserBody
        | Signal<UsersAddSocialAccountForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<UsersAddSocialAccountForAuthenticatedUserResponse>
    >
  >('USERS_ADD_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | UsersAddSocialAccountForAuthenticatedUserBody
          | Signal<UsersAddSocialAccountForAuthenticatedUserBody>,
      ) =>
        httpResource<UsersAddSocialAccountForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/social_accounts`,
          method: 'POST',
          body,
        }));
    },
  });
