import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_CANCEL_IMPORT } from './migrations-cancel-import.token';

export function provideMigrationsCancelImportMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_CANCEL_IMPORT,
    'MIGRATIONS_CANCEL_IMPORT',
    initialBehavior,
  );
}
