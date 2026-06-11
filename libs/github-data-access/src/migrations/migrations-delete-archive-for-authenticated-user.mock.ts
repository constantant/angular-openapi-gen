import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_DELETE_ARCHIVE_FOR_AUTHENTICATED_USER } from './migrations-delete-archive-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/delete-archive-for-authenticated-user',
  path: '/user/migrations/{migration_id}/archive',
  method: 'delete',
  tag: 'migrations',
};

export function provideMigrationsDeleteArchiveForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_DELETE_ARCHIVE_FOR_AUTHENTICATED_USER,
    'MIGRATIONS_DELETE_ARCHIVE_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
