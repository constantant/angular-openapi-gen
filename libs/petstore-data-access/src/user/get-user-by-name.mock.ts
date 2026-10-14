import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import {
  provideGetUserByName,
  type GetUserByNameResponse,
} from './get-user-by-name.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'getUserByName',
  path: '/user/{username}',
  method: 'get',
  tag: 'user',
};

export const GET_USER_BY_NAME_MOCK: MockEndpoint<GetUserByNameResponse> = {
  key: 'GET_USER_BY_NAME',
  baseUrl: PETSTORE_BASE_URL,
  meta: _meta,
  provide: provideGetUserByName,
};

export function provideGetUserByNameMock(
  initialBehavior?: MockEndpointBehavior<GetUserByNameResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(GET_USER_BY_NAME_MOCK, initialBehavior);
}
