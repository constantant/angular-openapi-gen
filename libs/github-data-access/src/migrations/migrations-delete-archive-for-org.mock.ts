import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_DELETE_ARCHIVE_FOR_ORG } from './migrations-delete-archive-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/delete-archive-for-org',
  path: '/orgs/{org}/migrations/{migration_id}/archive',
  method: 'delete',
  tag: 'migrations',
};

export function provideMigrationsDeleteArchiveForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_DELETE_ARCHIVE_FOR_ORG,
    'MIGRATIONS_DELETE_ARCHIVE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
