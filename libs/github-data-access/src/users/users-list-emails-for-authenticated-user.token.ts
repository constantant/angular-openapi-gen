import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListEmailsForAuthenticatedUserParams =
  paths['/user/emails']['get']['parameters']['query'];

export type UsersListEmailsForAuthenticatedUserResponse =
  paths['/user/emails']['get']['responses']['200']['content']['application/json'];

export type UsersListEmailsForAuthenticatedUserError =
  | paths['/user/emails']['get']['responses']['401']['content']['application/json']
  | paths['/user/emails']['get']['responses']['403']['content']['application/json']
  | paths['/user/emails']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Email',
    description: 'Email',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'octocat@github.com',
      },
      primary: {
        type: 'boolean',
        example: true,
      },
      verified: {
        type: 'boolean',
        example: true,
      },
      visibility: {
        type: ['string', 'null'],
        example: 'public',
      },
    },
    required: ['email', 'primary', 'verified', 'visibility'],
  },
};

function _validateResponse(
  value: unknown,
): UsersListEmailsForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListEmailsForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListEmailsForAuthenticatedUserResponse;
}

export const USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?: UsersListEmailsForAuthenticatedUserParams,
  ) => Observable<UsersListEmailsForAuthenticatedUserResponse>
>('USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER');

export function provideUsersListEmailsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (params?: UsersListEmailsForAuthenticatedUserParams) =>
        http
          .request<UsersListEmailsForAuthenticatedUserResponse>(
            'GET',
            `${base}/user/emails`,
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
