import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_UNFOLLOW } from './users-unfollow.token';

export function provideUsersUnfollowMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(USERS_UNFOLLOW, 'USERS_UNFOLLOW', initialBehavior);
}
