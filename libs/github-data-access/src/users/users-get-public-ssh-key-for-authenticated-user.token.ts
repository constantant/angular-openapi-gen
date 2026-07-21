import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersGetPublicSshKeyForAuthenticatedUserResponse =
  paths['/user/keys/{key_id}']['get']['responses']['200']['content']['application/json'];

export type UsersGetPublicSshKeyForAuthenticatedUserError =
  | paths['/user/keys/{key_id}']['get']['responses']['401']['content']['application/json']
  | paths['/user/keys/{key_id}']['get']['responses']['403']['content']['application/json']
  | paths['/user/keys/{key_id}']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
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
};

function _validateResponse(
  value: unknown,
): UsersGetPublicSshKeyForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersGetPublicSshKeyForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersGetPublicSshKeyForAuthenticatedUserResponse;
}

export const USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      keyId: string,
    ) => ReturnType<
      typeof httpResource<UsersGetPublicSshKeyForAuthenticatedUserResponse>
    >
  >('USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER');

export function provideUsersGetPublicSshKeyForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (keyId: string) =>
        httpResource<UsersGetPublicSshKeyForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/keys/${keyId}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
