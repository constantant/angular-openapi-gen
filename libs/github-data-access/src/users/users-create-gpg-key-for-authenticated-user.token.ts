import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersCreateGpgKeyForAuthenticatedUserBody = NonNullable<
  paths['/user/gpg_keys']['post']['requestBody']
>['content']['application/json'];

export type UsersCreateGpgKeyForAuthenticatedUserResponse =
  paths['/user/gpg_keys']['post']['responses']['201']['content']['application/json'];

export const USERS_CREATE_GPG_KEY_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    body:
      | UsersCreateGpgKeyForAuthenticatedUserBody
      | Signal<UsersCreateGpgKeyForAuthenticatedUserBody>,
  ) => ReturnType<
    typeof httpResource<UsersCreateGpgKeyForAuthenticatedUserResponse>
  >
>('USERS_CREATE_GPG_KEY_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      body:
        | UsersCreateGpgKeyForAuthenticatedUserBody
        | Signal<UsersCreateGpgKeyForAuthenticatedUserBody>,
    ) =>
      httpResource<UsersCreateGpgKeyForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/gpg_keys`,
        method: 'POST',
        body,
      }));
  },
});
