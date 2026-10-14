import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersListFollowersForAuthenticatedUser,
  type UsersListFollowersForAuthenticatedUserResponse,
} from './users-list-followers-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-followers-for-authenticated-user',
  path: '/user/followers',
  method: 'get',
  tag: 'users',
};

export const USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<UsersListFollowersForAuthenticatedUserResponse> =
  {
    key: 'USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersListFollowersForAuthenticatedUser,
  };

export function provideUsersListFollowersForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<UsersListFollowersForAuthenticatedUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
