import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { provideLoginUser, type LoginUserResponse } from './login-user.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'loginUser',
  path: '/user/login',
  method: 'get',
  tag: 'user',
};

export const LOGIN_USER_MOCK: MockEndpoint<LoginUserResponse> = {
  key: 'LOGIN_USER',
  baseUrl: PETSTORE_BASE_URL,
  meta: _meta,
  provide: provideLoginUser,
};

export function provideLoginUserMock(
  initialBehavior?: MockEndpointBehavior<LoginUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(LOGIN_USER_MOCK, initialBehavior);
}
