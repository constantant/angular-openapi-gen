import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideUsersCheckFollowingForUser } from './users-check-following-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/check-following-for-user',
  path: '/users/{username}/following/{target_user}',
  method: 'get',
  tag: 'users',
};

export const USERS_CHECK_FOLLOWING_FOR_USER_MOCK: MockEndpoint<unknown> = {
  key: 'USERS_CHECK_FOLLOWING_FOR_USER',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideUsersCheckFollowingForUser,
};

export function provideUsersCheckFollowingForUserMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_CHECK_FOLLOWING_FOR_USER_MOCK,
    initialBehavior,
  );
}
