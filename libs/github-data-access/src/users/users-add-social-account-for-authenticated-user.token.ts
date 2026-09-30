import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
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
      body: UsersAddSocialAccountForAuthenticatedUserBody,
    ) => Observable<UsersAddSocialAccountForAuthenticatedUserResponse>
  >('USERS_ADD_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER');

export function provideUsersAddSocialAccountForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_ADD_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (body: UsersAddSocialAccountForAuthenticatedUserBody) =>
        http
          .request<UsersAddSocialAccountForAuthenticatedUserResponse>(
            'POST',
            `${base}/user/social_accounts`,
            {
              body,
            },
          )
          .pipe(map(_validateResponse));
    },
  };
}
