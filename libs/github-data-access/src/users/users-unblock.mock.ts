import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideUsersUnblock } from './users-unblock.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/unblock',
  path: '/user/blocks/{username}',
  method: 'delete',
  tag: 'users',
};

export const USERS_UNBLOCK_MOCK: MockEndpoint<unknown> = {
  key: 'USERS_UNBLOCK',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideUsersUnblock,
};

export function provideUsersUnblockMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(USERS_UNBLOCK_MOCK, initialBehavior);
}
