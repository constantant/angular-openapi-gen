import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER } from './users-list-followed-by-authenticated-user.token';
import type { UsersListFollowedByAuthenticatedUserResponse } from './users-list-followed-by-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-followed-by-authenticated-user',
  path: '/user/following',
  method: 'get',
  tag: 'users',
};

export function provideUsersListFollowedByAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListFollowedByAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER,
    'USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
