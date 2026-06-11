import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_UPDATE_IMPORT } from './migrations-update-import.token';
import type { MigrationsUpdateImportResponse } from './migrations-update-import.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/update-import',
  path: '/repos/{owner}/{repo}/import',
  method: 'patch',
  tag: 'migrations',
};

export function provideMigrationsUpdateImportMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsUpdateImportResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_UPDATE_IMPORT,
    'MIGRATIONS_UPDATE_IMPORT',
    initialBehavior,
    _meta,
  );
}
