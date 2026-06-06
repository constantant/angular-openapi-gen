import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersCreateSshSigningKeyForAuthenticatedUserBody = NonNullable<
  paths['/user/ssh_signing_keys']['post']['requestBody']
>['content']['application/json'];

type UsersCreateSshSigningKeyForAuthenticatedUserResponse =
  paths['/user/ssh_signing_keys']['post']['responses']['201']['content']['application/json'];

export const USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body:
        | UsersCreateSshSigningKeyForAuthenticatedUserBody
        | Signal<UsersCreateSshSigningKeyForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<UsersCreateSshSigningKeyForAuthenticatedUserResponse>
    >
  >('USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | UsersCreateSshSigningKeyForAuthenticatedUserBody
          | Signal<UsersCreateSshSigningKeyForAuthenticatedUserBody>,
      ) =>
        httpResource<UsersCreateSshSigningKeyForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/ssh_signing_keys`,
            method: 'POST',
            body,
          }),
        );
    },
  });
