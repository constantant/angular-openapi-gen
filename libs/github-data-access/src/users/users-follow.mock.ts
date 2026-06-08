import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_FOLLOW } from './users-follow.token';

export function provideUsersFollowMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(USERS_FOLLOW, 'USERS_FOLLOW', initialBehavior);
}
