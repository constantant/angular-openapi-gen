import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_LIST_FOR_AUTHENTICATED_USER } from './migrations-list-for-authenticated-user.token';
import type { MigrationsListForAuthenticatedUserResponse } from './migrations-list-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/list-for-authenticated-user',
  path: '/user/migrations',
  method: 'get',
  tag: 'migrations',
};

export function provideMigrationsListForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsListForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_LIST_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_LIST_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
