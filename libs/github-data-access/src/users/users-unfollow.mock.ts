import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideUsersUnfollow } from './users-unfollow.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/unfollow',
  path: '/user/following/{username}',
  method: 'delete',
  tag: 'users',
};

export const USERS_UNFOLLOW_MOCK: MockEndpoint<unknown> = {
  key: 'USERS_UNFOLLOW',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideUsersUnfollow,
};

export function provideUsersUnfollowMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(USERS_UNFOLLOW_MOCK, initialBehavior);
}
