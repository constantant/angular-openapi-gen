import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersDeleteSocialAccountForAuthenticatedUserBody = NonNullable<
  paths['/user/social_accounts']['delete']['requestBody']
>['content']['application/json'];

export type UsersDeleteSocialAccountForAuthenticatedUserError =
  | paths['/user/social_accounts']['delete']['responses']['401']['content']['application/json']
  | paths['/user/social_accounts']['delete']['responses']['403']['content']['application/json']
  | paths['/user/social_accounts']['delete']['responses']['404']['content']['application/json']
  | paths['/user/social_accounts']['delete']['responses']['422']['content']['application/json'];

export const USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body:
        | UsersDeleteSocialAccountForAuthenticatedUserBody
        | Signal<UsersDeleteSocialAccountForAuthenticatedUserBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER');

export function provideUsersDeleteSocialAccountForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER,
    useFactory: () => {
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
  };
}
