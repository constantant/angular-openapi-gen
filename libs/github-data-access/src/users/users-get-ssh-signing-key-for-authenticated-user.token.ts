import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersGetSshSigningKeyForAuthenticatedUserResponse =
  paths['/user/ssh_signing_keys/{ssh_signing_key_id}']['get']['responses']['200']['content']['application/json'];

export type UsersGetSshSigningKeyForAuthenticatedUserError =
  | paths['/user/ssh_signing_keys/{ssh_signing_key_id}']['get']['responses']['401']['content']['application/json']
  | paths['/user/ssh_signing_keys/{ssh_signing_key_id}']['get']['responses']['403']['content']['application/json']
  | paths['/user/ssh_signing_keys/{ssh_signing_key_id}']['get']['responses']['404']['content']['application/json'];

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
): UsersGetSshSigningKeyForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersGetSshSigningKeyForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersGetSshSigningKeyForAuthenticatedUserResponse;
}

export const USERS_GET_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      sshSigningKeyId: string,
    ) => Observable<UsersGetSshSigningKeyForAuthenticatedUserResponse>
  >('USERS_GET_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER');

export function provideUsersGetSshSigningKeyForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_GET_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (sshSigningKeyId: string) =>
        http
          .request<UsersGetSshSigningKeyForAuthenticatedUserResponse>(
            'GET',
            `${base}/user/ssh_signing_keys/${sshSigningKeyId}`,
            {},
          )
          .pipe(map(_validateResponse));
    },
  };
}
