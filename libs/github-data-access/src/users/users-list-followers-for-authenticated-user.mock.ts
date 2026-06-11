import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER } from './users-list-followers-for-authenticated-user.token';
import type { UsersListFollowersForAuthenticatedUserResponse } from './users-list-followers-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-followers-for-authenticated-user',
  path: '/user/followers',
  method: 'get',
  tag: 'users',
};

export function provideUsersListFollowersForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListFollowersForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER,
    'USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
