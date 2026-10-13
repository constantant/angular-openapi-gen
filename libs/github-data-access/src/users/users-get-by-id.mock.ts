import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersGetById,
  type UsersGetByIdResponse,
} from './users-get-by-id.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-by-id',
  path: '/user/{account_id}',
  method: 'get',
  tag: 'users',
};

export const USERS_GET_BY_ID_MOCK: MockEndpoint<UsersGetByIdResponse> = {
  key: 'USERS_GET_BY_ID',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideUsersGetById,
};

export function provideUsersGetByIdMock(
  initialBehavior?: MockEndpointBehavior<UsersGetByIdResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(USERS_GET_BY_ID_MOCK, initialBehavior);
}
