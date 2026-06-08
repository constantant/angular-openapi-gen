import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_DOWNLOAD_ARCHIVE_FOR_ORG } from './migrations-download-archive-for-org.token';

export function provideMigrationsDownloadArchiveForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_DOWNLOAD_ARCHIVE_FOR_ORG,
    'MIGRATIONS_DOWNLOAD_ARCHIVE_FOR_ORG',
    initialBehavior,
  );
}
