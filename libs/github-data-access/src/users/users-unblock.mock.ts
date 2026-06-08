import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_UNBLOCK } from './users-unblock.token';

export function provideUsersUnblockMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(USERS_UNBLOCK, 'USERS_UNBLOCK', initialBehavior);
}
