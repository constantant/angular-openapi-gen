import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_GET_AUTHENTICATED } from './users-get-authenticated.token';
import type { UsersGetAuthenticatedResponse } from './users-get-authenticated.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-authenticated',
  path: '/user',
  method: 'get',
  tag: 'users',
};

export function provideUsersGetAuthenticatedMock(
  initialBehavior?: ProviderInitialBehavior<UsersGetAuthenticatedResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    USERS_GET_AUTHENTICATED,
    'USERS_GET_AUTHENTICATED',
    initialBehavior,
    _meta,
    options,
  );
}
