import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_CHECK_BLOCKED } from './users-check-blocked.token';

export function provideUsersCheckBlockedMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_CHECK_BLOCKED,
    'USERS_CHECK_BLOCKED',
    initialBehavior,
  );
}
