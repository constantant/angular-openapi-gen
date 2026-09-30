import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersCreateSshSigningKeyForAuthenticatedUserBody = NonNullable<
  paths['/user/ssh_signing_keys']['post']['requestBody']
>['content']['application/json'];

export type UsersCreateSshSigningKeyForAuthenticatedUserResponse =
  paths['/user/ssh_signing_keys']['post']['responses']['201']['content']['application/json'];

export type UsersCreateSshSigningKeyForAuthenticatedUserError =
  | paths['/user/ssh_signing_keys']['post']['responses']['401']['content']['application/json']
  | paths['/user/ssh_signing_keys']['post']['responses']['403']['content']['application/json']
  | paths['/user/ssh_signing_keys']['post']['responses']['404']['content']['application/json']
  | paths['/user/ssh_signing_keys']['post']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'SSH Signing Key',
  description: 'A public SSH key used to sign Git commits',
  type: 'object',
  properties: {
    key: {
      type: 'string',
    },
    id: {
      type: 'integer',
    },
    title: {
      type: 'string',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['key', 'id', 'title', 'created_at'],
};

function _validateResponse(
  value: unknown,
): UsersCreateSshSigningKeyForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersCreateSshSigningKeyForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersCreateSshSigningKeyForAuthenticatedUserResponse;
}

export const USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body: UsersCreateSshSigningKeyForAuthenticatedUserBody,
    ) => Observable<UsersCreateSshSigningKeyForAuthenticatedUserResponse>
  >('USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER');

export function provideUsersCreateSshSigningKeyForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (body: UsersCreateSshSigningKeyForAuthenticatedUserBody) =>
        http
          .request<UsersCreateSshSigningKeyForAuthenticatedUserResponse>(
            'POST',
            `${base}/user/ssh_signing_keys`,
            {
              body,
            },
          )
          .pipe(map(_validateResponse));
    },
  };
}
