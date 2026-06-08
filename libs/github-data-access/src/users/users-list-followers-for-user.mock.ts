import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_FOLLOWERS_FOR_USER } from './users-list-followers-for-user.token';
import type { UsersListFollowersForUserResponse } from './users-list-followers-for-user.token';

export function provideUsersListFollowersForUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListFollowersForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_FOLLOWERS_FOR_USER,
    'USERS_LIST_FOLLOWERS_FOR_USER',
    initialBehavior,
  );
}
