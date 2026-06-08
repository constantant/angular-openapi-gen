import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_CHECK_FOLLOWING_FOR_USER } from './users-check-following-for-user.token';

export function provideUsersCheckFollowingForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_CHECK_FOLLOWING_FOR_USER,
    'USERS_CHECK_FOLLOWING_FOR_USER',
    initialBehavior,
  );
}
