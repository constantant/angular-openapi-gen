import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersListSocialAccountsForUser,
  type UsersListSocialAccountsForUserResponse,
} from './users-list-social-accounts-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-social-accounts-for-user',
  path: '/users/{username}/social_accounts',
  method: 'get',
  tag: 'users',
};

export const USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER_MOCK: MockEndpoint<UsersListSocialAccountsForUserResponse> =
  {
    key: 'USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersListSocialAccountsForUser,
  };

export function provideUsersListSocialAccountsForUserMock(
  initialBehavior?: MockEndpointBehavior<UsersListSocialAccountsForUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER_MOCK,
    initialBehavior,
  );
}
