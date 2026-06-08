import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_GET_IMPORT_STATUS } from './migrations-get-import-status.token';
import type { MigrationsGetImportStatusResponse } from './migrations-get-import-status.token';

export function provideMigrationsGetImportStatusMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsGetImportStatusResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_GET_IMPORT_STATUS,
    'MIGRATIONS_GET_IMPORT_STATUS',
    initialBehavior,
  );
}
