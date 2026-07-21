import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersAddSocialAccountForAuthenticatedUserBody = NonNullable<
  paths['/user/social_accounts']['post']['requestBody']
>['content']['application/json'];

export type UsersAddSocialAccountForAuthenticatedUserResponse =
  paths['/user/social_accounts']['post']['responses']['201']['content']['application/json'];

export type UsersAddSocialAccountForAuthenticatedUserError =
  | paths['/user/social_accounts']['post']['responses']['401']['content']['application/json']
  | paths['/user/social_accounts']['post']['responses']['403']['content']['application/json']
  | paths['/user/social_accounts']['post']['responses']['404']['content']['application/json']
  | paths['/user/social_accounts']['post']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Social account',
    description: 'Social media account',
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        example: 'linkedin',
      },
      url: {
        type: 'string',
        example: 'https://www.linkedin.com/company/github/',
      },
    },
    required: ['provider', 'url'],
  },
};

function _validateResponse(
  value: unknown,
): UsersAddSocialAccountForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersAddSocialAccountForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersAddSocialAccountForAuthenticatedUserResponse;
}

export const USERS_ADD_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body:
        | UsersAddSocialAccountForAuthenticatedUserBody
        | Signal<UsersAddSocialAccountForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<UsersAddSocialAccountForAuthenticatedUserResponse>
    >
  >('USERS_ADD_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER');

export function provideUsersAddSocialAccountForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_ADD_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | UsersAddSocialAccountForAuthenticatedUserBody
          | Signal<UsersAddSocialAccountForAuthenticatedUserBody>,
      ) =>
        httpResource<UsersAddSocialAccountForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/social_accounts`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
