import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersCreatePublicSshKeyForAuthenticatedUserBody = NonNullable<
  paths['/user/keys']['post']['requestBody']
>['content']['application/json'];

export type UsersCreatePublicSshKeyForAuthenticatedUserResponse =
  paths['/user/keys']['post']['responses']['201']['content']['application/json'];

export type UsersCreatePublicSshKeyForAuthenticatedUserError =
  | paths['/user/keys']['post']['responses']['401']['content']['application/json']
  | paths['/user/keys']['post']['responses']['403']['content']['application/json']
  | paths['/user/keys']['post']['responses']['404']['content']['application/json']
  | paths['/user/keys']['post']['responses']['422']['content']['application/json'];

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
): UsersCreatePublicSshKeyForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersCreatePublicSshKeyForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersCreatePublicSshKeyForAuthenticatedUserResponse;
}

export const USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body:
        | UsersCreatePublicSshKeyForAuthenticatedUserBody
        | Signal<UsersCreatePublicSshKeyForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<UsersCreatePublicSshKeyForAuthenticatedUserResponse>
    >
  >('USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER');

export function provideUsersCreatePublicSshKeyForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
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
          { parse: _validateResponse },
        );
    },
  };
}
