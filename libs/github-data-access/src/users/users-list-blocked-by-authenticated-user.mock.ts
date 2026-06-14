import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER } from './users-list-blocked-by-authenticated-user.token';
import type { UsersListBlockedByAuthenticatedUserResponse } from './users-list-blocked-by-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-blocked-by-authenticated-user',
  path: '/user/blocks',
  method: 'get',
  tag: 'users',
};

export function provideUsersListBlockedByAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListBlockedByAuthenticatedUserResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER,
    'USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
    options,
  );
}
