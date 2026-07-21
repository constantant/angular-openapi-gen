import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody =
  NonNullable<
    paths['/user/email/visibility']['patch']['requestBody']
  >['content']['application/json'];

export type UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse =
  paths['/user/email/visibility']['patch']['responses']['200']['content']['application/json'];

export type UsersSetPrimaryEmailVisibilityForAuthenticatedUserError =
  | paths['/user/email/visibility']['patch']['responses']['401']['content']['application/json']
  | paths['/user/email/visibility']['patch']['responses']['403']['content']['application/json']
  | paths['/user/email/visibility']['patch']['responses']['404']['content']['application/json']
  | paths['/user/email/visibility']['patch']['responses']['422']['content']['application/json'];

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
): UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersSetPrimaryEmailVisibilityForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse;
}

export const USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body:
        | UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody
        | Signal<UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse>
    >
  >('USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER');

export function provideUsersSetPrimaryEmailVisibilityForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody
          | Signal<UsersSetPrimaryEmailVisibilityForAuthenticatedUserBody>,
      ) =>
        httpResource<UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/email/visibility`,
            method: 'PATCH',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
