import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListPublicEmailsForAuthenticatedUserParams =
  paths['/user/public_emails']['get']['parameters']['query'];

export type UsersListPublicEmailsForAuthenticatedUserResponse =
  paths['/user/public_emails']['get']['responses']['200']['content']['application/json'];

export type UsersListPublicEmailsForAuthenticatedUserError =
  | paths['/user/public_emails']['get']['responses']['401']['content']['application/json']
  | paths['/user/public_emails']['get']['responses']['403']['content']['application/json']
  | paths['/user/public_emails']['get']['responses']['404']['content']['application/json'];

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
): UsersListPublicEmailsForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListPublicEmailsForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListPublicEmailsForAuthenticatedUserResponse;
}

export const USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | UsersListPublicEmailsForAuthenticatedUserParams
        | (() => UsersListPublicEmailsForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<UsersListPublicEmailsForAuthenticatedUserResponse>
    >
  >('USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER');

export function provideUsersListPublicEmailsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListPublicEmailsForAuthenticatedUserParams
          | (() => UsersListPublicEmailsForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<UsersListPublicEmailsForAuthenticatedUserResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/user/public_emails`,
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
