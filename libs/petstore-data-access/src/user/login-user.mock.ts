import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { LOGIN_USER } from './login-user.token';
import type { LoginUserResponse } from './login-user.token';

export function provideLoginUserMock(
  initialBehavior?: ProviderInitialBehavior<LoginUserResponse>,
): FactoryProvider {
  return provideMockResource(LOGIN_USER, 'LOGIN_USER', initialBehavior);
}
