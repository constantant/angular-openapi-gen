import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_GET_AUTHENTICATED } from './users-get-authenticated.token';
import type { UsersGetAuthenticatedResponse } from './users-get-authenticated.token';

export function provideUsersGetAuthenticatedMock(
  initialBehavior?: ProviderInitialBehavior<UsersGetAuthenticatedResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_GET_AUTHENTICATED,
    'USERS_GET_AUTHENTICATED',
    initialBehavior,
  );
}
