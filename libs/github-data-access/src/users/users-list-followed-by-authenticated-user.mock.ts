import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER } from './users-list-followed-by-authenticated-user.token';
import type { UsersListFollowedByAuthenticatedUserResponse } from './users-list-followed-by-authenticated-user.token';

export function provideUsersListFollowedByAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListFollowedByAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER,
    'USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER',
    initialBehavior,
  );
}
