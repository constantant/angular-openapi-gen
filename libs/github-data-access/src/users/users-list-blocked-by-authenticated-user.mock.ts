import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersListBlockedByAuthenticatedUser,
  type UsersListBlockedByAuthenticatedUserResponse,
} from './users-list-blocked-by-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-blocked-by-authenticated-user',
  path: '/user/blocks',
  method: 'get',
  tag: 'users',
};

export const USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER_MOCK: MockEndpoint<UsersListBlockedByAuthenticatedUserResponse> =
  {
    key: 'USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersListBlockedByAuthenticatedUser,
  };

export function provideUsersListBlockedByAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<UsersListBlockedByAuthenticatedUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
