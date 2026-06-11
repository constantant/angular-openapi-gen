import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_DOWNLOAD_ARCHIVE_FOR_ORG } from './migrations-download-archive-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/download-archive-for-org',
  path: '/orgs/{org}/migrations/{migration_id}/archive',
  method: 'get',
  tag: 'migrations',
};

export function provideMigrationsDownloadArchiveForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_DOWNLOAD_ARCHIVE_FOR_ORG,
    'MIGRATIONS_DOWNLOAD_ARCHIVE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
