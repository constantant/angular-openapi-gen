import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
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
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    USERS_LIST,
    'USERS_LIST',
    initialBehavior,
    _meta,
    options,
  );
}
