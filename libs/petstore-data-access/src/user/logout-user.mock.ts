import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { provideLogoutUser } from './logout-user.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'logoutUser',
  path: '/user/logout',
  method: 'get',
  tag: 'user',
};

export const LOGOUT_USER_MOCK: MockEndpoint<unknown> = {
  key: 'LOGOUT_USER',
  baseUrl: PETSTORE_BASE_URL,
  meta: _meta,
  provide: provideLogoutUser,
};

export function provideLogoutUserMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(LOGOUT_USER_MOCK, initialBehavior);
}
