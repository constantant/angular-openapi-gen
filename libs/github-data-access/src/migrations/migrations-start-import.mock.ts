import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_START_IMPORT } from './migrations-start-import.token';
import type { MigrationsStartImportResponse } from './migrations-start-import.token';

export function provideMigrationsStartImportMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsStartImportResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_START_IMPORT,
    'MIGRATIONS_START_IMPORT',
    initialBehavior,
  );
}
