import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListSshSigningKeysForAuthenticatedUserParams =
  paths['/user/ssh_signing_keys']['get']['parameters']['query'];

export type UsersListSshSigningKeysForAuthenticatedUserResponse =
  paths['/user/ssh_signing_keys']['get']['responses']['200']['content']['application/json'];

export type UsersListSshSigningKeysForAuthenticatedUserError =
  | paths['/user/ssh_signing_keys']['get']['responses']['401']['content']['application/json']
  | paths['/user/ssh_signing_keys']['get']['responses']['403']['content']['application/json']
  | paths['/user/ssh_signing_keys']['get']['responses']['404']['content']['application/json'];

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
): UsersListSshSigningKeysForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListSshSigningKeysForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListSshSigningKeysForAuthenticatedUserResponse;
}

export const USERS_LIST_SSH_SIGNING_KEYS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | UsersListSshSigningKeysForAuthenticatedUserParams
        | (() => UsersListSshSigningKeysForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<UsersListSshSigningKeysForAuthenticatedUserResponse>
    >
  >('USERS_LIST_SSH_SIGNING_KEYS_FOR_AUTHENTICATED_USER');

export function provideUsersListSshSigningKeysForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_SSH_SIGNING_KEYS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListSshSigningKeysForAuthenticatedUserParams
          | (() =>
              UsersListSshSigningKeysForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<UsersListSshSigningKeysForAuthenticatedUserResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/user/ssh_signing_keys`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
          { parse: _validateResponse },
        );
    },
  };
}
