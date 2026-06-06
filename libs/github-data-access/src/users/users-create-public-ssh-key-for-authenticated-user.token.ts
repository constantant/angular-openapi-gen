import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersCreatePublicSshKeyForAuthenticatedUserBody = NonNullable<
  paths['/user/keys']['post']['requestBody']
>['content']['application/json'];

export type UsersCreatePublicSshKeyForAuthenticatedUserResponse =
  paths['/user/keys']['post']['responses']['201']['content']['application/json'];

export const USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body:
        | UsersCreatePublicSshKeyForAuthenticatedUserBody
        | Signal<UsersCreatePublicSshKeyForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<UsersCreatePublicSshKeyForAuthenticatedUserResponse>
    >
  >('USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | UsersCreatePublicSshKeyForAuthenticatedUserBody
          | Signal<UsersCreatePublicSshKeyForAuthenticatedUserBody>,
      ) =>
        httpResource<UsersCreatePublicSshKeyForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/keys`,
            method: 'POST',
            body,
          }),
        );
    },
  });
