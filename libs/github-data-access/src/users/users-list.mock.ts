import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_LIST } from './users-list.token';
import type { UsersListResponse } from './users-list.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list',
  path: '/users',
  method: 'get',
  tag: 'users',
};

export function provideUsersListMock(
  initialBehavior?: ProviderInitialBehavior<UsersListResponse>,
): FactoryProvider {
  return provideMockResource(USERS_LIST, 'USERS_LIST', initialBehavior, _meta);
}
