import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { LOGIN_USER } from './login-user.token';
import type { LoginUserResponse } from './login-user.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'loginUser',
  path: '/user/login',
  method: 'get',
  tag: 'user',
};

export function provideLoginUserMock(
  initialBehavior?: ProviderInitialBehavior<LoginUserResponse>,
): FactoryProvider {
  return provideMockResource(LOGIN_USER, 'LOGIN_USER', initialBehavior, _meta);
}
