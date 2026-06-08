import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_GET_LARGE_FILES } from './migrations-get-large-files.token';
import type { MigrationsGetLargeFilesResponse } from './migrations-get-large-files.token';

export function provideMigrationsGetLargeFilesMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsGetLargeFilesResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_GET_LARGE_FILES,
    'MIGRATIONS_GET_LARGE_FILES',
    initialBehavior,
  );
}
