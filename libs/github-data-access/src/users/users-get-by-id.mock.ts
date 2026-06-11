import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_GET_BY_ID } from './users-get-by-id.token';
import type { UsersGetByIdResponse } from './users-get-by-id.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-by-id',
  path: '/user/{account_id}',
  method: 'get',
  tag: 'users',
};

export function provideUsersGetByIdMock(
  initialBehavior?: ProviderInitialBehavior<UsersGetByIdResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_GET_BY_ID,
    'USERS_GET_BY_ID',
    initialBehavior,
    _meta,
  );
}
