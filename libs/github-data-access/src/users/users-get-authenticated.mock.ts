import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersGetAuthenticated,
  type UsersGetAuthenticatedResponse,
} from './users-get-authenticated.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-authenticated',
  path: '/user',
  method: 'get',
  tag: 'users',
};

export const USERS_GET_AUTHENTICATED_MOCK: MockEndpoint<UsersGetAuthenticatedResponse> =
  {
    key: 'USERS_GET_AUTHENTICATED',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersGetAuthenticated,
  };

export function provideUsersGetAuthenticatedMock(
  initialBehavior?: MockEndpointBehavior<UsersGetAuthenticatedResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(USERS_GET_AUTHENTICATED_MOCK, initialBehavior);
}
