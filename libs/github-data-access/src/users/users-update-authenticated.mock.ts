import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_UPDATE_AUTHENTICATED } from './users-update-authenticated.token';
import type { UsersUpdateAuthenticatedResponse } from './users-update-authenticated.token';

export function provideUsersUpdateAuthenticatedMock(
  initialBehavior?: ProviderInitialBehavior<UsersUpdateAuthenticatedResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_UPDATE_AUTHENTICATED,
    'USERS_UPDATE_AUTHENTICATED',
    initialBehavior,
  );
}
