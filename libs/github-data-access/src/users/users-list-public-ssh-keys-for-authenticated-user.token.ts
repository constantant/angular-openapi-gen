import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListPublicSshKeysForAuthenticatedUserParams =
  paths['/user/keys']['get']['parameters']['query'];

export type UsersListPublicSshKeysForAuthenticatedUserResponse =
  paths['/user/keys']['get']['responses']['200']['content']['application/json'];

export type UsersListPublicSshKeysForAuthenticatedUserError =
  | paths['/user/keys']['get']['responses']['401']['content']['application/json']
  | paths['/user/keys']['get']['responses']['403']['content']['application/json']
  | paths['/user/keys']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Key',
    description: 'Key',
    type: 'object',
    properties: {
      key: {
        type: 'string',
      },
      id: {
        type: 'integer',
        format: 'int64',
      },
      url: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      created_at: {
        type: 'string',
        format: 'date-time',
      },
      verified: {
        type: 'boolean',
      },
      read_only: {
        type: 'boolean',
      },
      last_used: {
        type: ['string', 'null'],
        format: 'date-time',
      },
    },
    required: [
      'key',
      'id',
      'url',
      'title',
      'created_at',
      'verified',
      'read_only',
    ],
  },
};

function _validateResponse(
  value: unknown,
): UsersListPublicSshKeysForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListPublicSshKeysForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListPublicSshKeysForAuthenticatedUserResponse;
}

export const USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | UsersListPublicSshKeysForAuthenticatedUserParams
        | (() => UsersListPublicSshKeysForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<UsersListPublicSshKeysForAuthenticatedUserResponse>
    >
  >('USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER');

export function provideUsersListPublicSshKeysForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListPublicSshKeysForAuthenticatedUserParams
          | (() =>
              UsersListPublicSshKeysForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<UsersListPublicSshKeysForAuthenticatedUserResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/user/keys`,
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
