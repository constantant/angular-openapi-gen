import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_DELETE_ARCHIVE_FOR_ORG } from './migrations-delete-archive-for-org.token';

export function provideMigrationsDeleteArchiveForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_DELETE_ARCHIVE_FOR_ORG,
    'MIGRATIONS_DELETE_ARCHIVE_FOR_ORG',
    initialBehavior,
  );
}
