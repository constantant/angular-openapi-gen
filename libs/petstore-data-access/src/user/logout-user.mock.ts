import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { LOGOUT_USER } from './logout-user.token';

export function provideLogoutUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(LOGOUT_USER, 'LOGOUT_USER', initialBehavior);
}
