import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_START_IMPORT } from './migrations-start-import.token';
import type { MigrationsStartImportResponse } from './migrations-start-import.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/start-import',
  path: '/repos/{owner}/{repo}/import',
  method: 'put',
  tag: 'migrations',
};

export function provideMigrationsStartImportMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsStartImportResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_START_IMPORT,
    'MIGRATIONS_START_IMPORT',
    initialBehavior,
    _meta,
  );
}
