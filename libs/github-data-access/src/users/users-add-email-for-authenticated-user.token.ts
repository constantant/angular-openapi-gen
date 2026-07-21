import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersAddEmailForAuthenticatedUserBody = NonNullable<
  paths['/user/emails']['post']['requestBody']
>['content']['application/json'];

export type UsersAddEmailForAuthenticatedUserResponse =
  paths['/user/emails']['post']['responses']['201']['content']['application/json'];

export type UsersAddEmailForAuthenticatedUserError =
  | paths['/user/emails']['post']['responses']['401']['content']['application/json']
  | paths['/user/emails']['post']['responses']['403']['content']['application/json']
  | paths['/user/emails']['post']['responses']['404']['content']['application/json']
  | paths['/user/emails']['post']['responses']['422']['content']['application/json'];

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
): UsersAddEmailForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersAddEmailForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersAddEmailForAuthenticatedUserResponse;
}

export const USERS_ADD_EMAIL_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    body:
      | UsersAddEmailForAuthenticatedUserBody
      | Signal<UsersAddEmailForAuthenticatedUserBody>,
  ) => ReturnType<
    typeof httpResource<UsersAddEmailForAuthenticatedUserResponse>
  >
>('USERS_ADD_EMAIL_FOR_AUTHENTICATED_USER');

export function provideUsersAddEmailForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_ADD_EMAIL_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | UsersAddEmailForAuthenticatedUserBody
          | Signal<UsersAddEmailForAuthenticatedUserBody>,
      ) =>
        httpResource<UsersAddEmailForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/emails`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
