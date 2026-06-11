import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_START_FOR_AUTHENTICATED_USER } from './migrations-start-for-authenticated-user.token';
import type { MigrationsStartForAuthenticatedUserResponse } from './migrations-start-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/start-for-authenticated-user',
  path: '/user/migrations',
  method: 'post',
  tag: 'migrations',
};

export function provideMigrationsStartForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsStartForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_START_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_START_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
