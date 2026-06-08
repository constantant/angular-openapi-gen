import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_FOLLOWING_FOR_USER } from './users-list-following-for-user.token';
import type { UsersListFollowingForUserResponse } from './users-list-following-for-user.token';

export function provideUsersListFollowingForUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListFollowingForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_FOLLOWING_FOR_USER,
    'USERS_LIST_FOLLOWING_FOR_USER',
    initialBehavior,
  );
}
