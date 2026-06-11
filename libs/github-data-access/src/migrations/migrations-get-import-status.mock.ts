import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_GET_IMPORT_STATUS } from './migrations-get-import-status.token';
import type { MigrationsGetImportStatusResponse } from './migrations-get-import-status.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/get-import-status',
  path: '/repos/{owner}/{repo}/import',
  method: 'get',
  tag: 'migrations',
};

export function provideMigrationsGetImportStatusMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsGetImportStatusResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_GET_IMPORT_STATUS,
    'MIGRATIONS_GET_IMPORT_STATUS',
    initialBehavior,
    _meta,
  );
}
