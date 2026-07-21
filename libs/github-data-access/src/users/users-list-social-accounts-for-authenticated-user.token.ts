import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListSocialAccountsForAuthenticatedUserParams =
  paths['/user/social_accounts']['get']['parameters']['query'];

export type UsersListSocialAccountsForAuthenticatedUserResponse =
  paths['/user/social_accounts']['get']['responses']['200']['content']['application/json'];

export type UsersListSocialAccountsForAuthenticatedUserError =
  | paths['/user/social_accounts']['get']['responses']['401']['content']['application/json']
  | paths['/user/social_accounts']['get']['responses']['403']['content']['application/json']
  | paths['/user/social_accounts']['get']['responses']['404']['content']['application/json'];

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
): UsersListSocialAccountsForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListSocialAccountsForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListSocialAccountsForAuthenticatedUserResponse;
}

export const USERS_LIST_SOCIAL_ACCOUNTS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | UsersListSocialAccountsForAuthenticatedUserParams
        | (() => UsersListSocialAccountsForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<UsersListSocialAccountsForAuthenticatedUserResponse>
    >
  >('USERS_LIST_SOCIAL_ACCOUNTS_FOR_AUTHENTICATED_USER');

export function provideUsersListSocialAccountsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_LIST_SOCIAL_ACCOUNTS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | UsersListSocialAccountsForAuthenticatedUserParams
          | (() =>
              UsersListSocialAccountsForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<UsersListSocialAccountsForAuthenticatedUserResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/user/social_accounts`,
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
