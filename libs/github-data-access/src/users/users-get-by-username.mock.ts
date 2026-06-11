import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_GET_BY_USERNAME } from './users-get-by-username.token';
import type { UsersGetByUsernameResponse } from './users-get-by-username.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-by-username',
  path: '/users/{username}',
  method: 'get',
  tag: 'users',
};

export function provideUsersGetByUsernameMock(
  initialBehavior?: ProviderInitialBehavior<UsersGetByUsernameResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_GET_BY_USERNAME,
    'USERS_GET_BY_USERNAME',
    initialBehavior,
    _meta,
  );
}
