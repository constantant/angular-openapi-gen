import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersGetContextForUser,
  type UsersGetContextForUserResponse,
} from './users-get-context-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-context-for-user',
  path: '/users/{username}/hovercard',
  method: 'get',
  tag: 'users',
};

export const USERS_GET_CONTEXT_FOR_USER_MOCK: MockEndpoint<UsersGetContextForUserResponse> =
  {
    key: 'USERS_GET_CONTEXT_FOR_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersGetContextForUser,
  };

export function provideUsersGetContextForUserMock(
  initialBehavior?: MockEndpointBehavior<UsersGetContextForUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(USERS_GET_CONTEXT_FOR_USER_MOCK, initialBehavior);
}
