import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersDeleteSocialAccountForAuthenticatedUserBody = NonNullable<
  paths['/user/social_accounts']['delete']['requestBody']
>['content']['application/json'];

export const USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body:
        | UsersDeleteSocialAccountForAuthenticatedUserBody
        | Signal<UsersDeleteSocialAccountForAuthenticatedUserBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | UsersDeleteSocialAccountForAuthenticatedUserBody
          | Signal<UsersDeleteSocialAccountForAuthenticatedUserBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/social_accounts`,
          method: 'DELETE',
          body,
        }));
    },
  });
