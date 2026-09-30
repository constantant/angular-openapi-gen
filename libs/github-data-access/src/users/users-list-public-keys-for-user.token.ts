import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListPublicKeysForUserParams =
  paths['/users/{username}/keys']['get']['parameters']['query'];

export type UsersListPublicKeysForUserResponse =
  paths['/users/{username}/keys']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Key Simple',
    description: 'Key Simple',
    type: 'object',
    properties: {
      id: {
        type: 'integer',
      },
      key: {
        type: 'string',
      },
      created_at: {
        type: 'string',
        format: 'date-time',
      },
      last_used: {
        type: ['string', 'null'],
        format: 'date-time',
      },
    },
    required: ['key', 'id'],
  },
};

function _validateResponse(value: unknown): UsersListPublicKeysForUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListPublicKeysForUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListPublicKeysForUserResponse;
}

export const USERS_LIST_PUBLIC_KEYS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: UsersListPublicKeysForUserParams,
  ) => Observable<UsersListPublicKeysForUserResponse>
>('USERS_LIST_PUBLIC_KEYS_FOR_USER');

export function provideUsersListPublicKeysForUser(): FactoryProvider {
  return {
    provide: USERS_LIST_PUBLIC_KEYS_FOR_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (username: string, params?: UsersListPublicKeysForUserParams) =>
        http
          .request<UsersListPublicKeysForUserResponse>(
            'GET',
            `${base}/users/${username}/keys`,
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
