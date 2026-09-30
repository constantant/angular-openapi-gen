import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
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
      body: UsersDeleteSocialAccountForAuthenticatedUserBody,
    ) => Observable<unknown>
  >('USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER');

export function provideUsersDeleteSocialAccountForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (body: UsersDeleteSocialAccountForAuthenticatedUserBody) =>
        http.request<unknown>('DELETE', `${base}/user/social_accounts`, {
          body,
        });
    },
  };
}
