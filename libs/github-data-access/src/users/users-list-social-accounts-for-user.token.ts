import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListSocialAccountsForUserParams =
  paths['/users/{username}/social_accounts']['get']['parameters']['query'];

export type UsersListSocialAccountsForUserResponse =
  paths['/users/{username}/social_accounts']['get']['responses']['200']['content']['application/json'];

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
): UsersListSocialAccountsForUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListSocialAccountsForUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListSocialAccountsForUserResponse;
}

export const USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: UsersListSocialAccountsForUserParams,
  ) => Observable<UsersListSocialAccountsForUserResponse>
>('USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER');

export function provideUsersListSocialAccountsForUser(): FactoryProvider {
  return {
    provide: USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?: UsersListSocialAccountsForUserParams,
      ) =>
        http
          .request<UsersListSocialAccountsForUserResponse>(
            'GET',
            `${base}/users/${username}/social_accounts`,
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
