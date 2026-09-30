import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListSshSigningKeysForUserParams =
  paths['/users/{username}/ssh_signing_keys']['get']['parameters']['query'];

export type UsersListSshSigningKeysForUserResponse =
  paths['/users/{username}/ssh_signing_keys']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
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
  },
};

function _validateResponse(
  value: unknown,
): UsersListSshSigningKeysForUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListSshSigningKeysForUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListSshSigningKeysForUserResponse;
}

export const USERS_LIST_SSH_SIGNING_KEYS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: UsersListSshSigningKeysForUserParams,
  ) => Observable<UsersListSshSigningKeysForUserResponse>
>('USERS_LIST_SSH_SIGNING_KEYS_FOR_USER');

export function provideUsersListSshSigningKeysForUser(): FactoryProvider {
  return {
    provide: USERS_LIST_SSH_SIGNING_KEYS_FOR_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?: UsersListSshSigningKeysForUserParams,
      ) =>
        http
          .request<UsersListSshSigningKeysForUserResponse>(
            'GET',
            `${base}/users/${username}/ssh_signing_keys`,
            {
              params: params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            },
          )
          .pipe(map(_validateResponse));
    },
  };
}
