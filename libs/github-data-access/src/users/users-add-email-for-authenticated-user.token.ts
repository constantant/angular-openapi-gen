import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersAddEmailForAuthenticatedUserBody = NonNullable<
  paths['/user/emails']['post']['requestBody']
>['content']['application/json'];

type UsersAddEmailForAuthenticatedUserResponse =
  paths['/user/emails']['post']['responses']['201']['content']['application/json'];

export const USERS_ADD_EMAIL_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    body:
      | UsersAddEmailForAuthenticatedUserBody
      | Signal<UsersAddEmailForAuthenticatedUserBody>,
  ) => ReturnType<
    typeof httpResource<UsersAddEmailForAuthenticatedUserResponse>
  >
>('USERS_ADD_EMAIL_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      body:
        | UsersAddEmailForAuthenticatedUserBody
        | Signal<UsersAddEmailForAuthenticatedUserBody>,
    ) =>
      httpResource<UsersAddEmailForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/emails`,
        method: 'POST',
        body,
      }));
  },
});
