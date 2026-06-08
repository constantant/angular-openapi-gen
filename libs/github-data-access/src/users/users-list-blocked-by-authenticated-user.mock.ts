import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER } from './users-list-blocked-by-authenticated-user.token';
import type { UsersListBlockedByAuthenticatedUserResponse } from './users-list-blocked-by-authenticated-user.token';

export function provideUsersListBlockedByAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListBlockedByAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER,
    'USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER',
    initialBehavior,
  );
}
