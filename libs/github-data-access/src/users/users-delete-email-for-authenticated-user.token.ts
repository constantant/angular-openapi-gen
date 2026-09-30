import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersDeleteEmailForAuthenticatedUserBody = NonNullable<
  paths['/user/emails']['delete']['requestBody']
>['content']['application/json'];

export type UsersDeleteEmailForAuthenticatedUserError =
  | paths['/user/emails']['delete']['responses']['401']['content']['application/json']
  | paths['/user/emails']['delete']['responses']['403']['content']['application/json']
  | paths['/user/emails']['delete']['responses']['404']['content']['application/json']
  | paths['/user/emails']['delete']['responses']['422']['content']['application/json'];

export const USERS_DELETE_EMAIL_FOR_AUTHENTICATED_USER = new InjectionToken<
  (body: UsersDeleteEmailForAuthenticatedUserBody) => Observable<unknown>
>('USERS_DELETE_EMAIL_FOR_AUTHENTICATED_USER');

export function provideUsersDeleteEmailForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_DELETE_EMAIL_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (body: UsersDeleteEmailForAuthenticatedUserBody) =>
        http.request<unknown>('DELETE', `${base}/user/emails`, {
          body,
        });
    },
  };
}
