import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_CANCEL_IMPORT } from './migrations-cancel-import.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/cancel-import',
  path: '/repos/{owner}/{repo}/import',
  method: 'delete',
  tag: 'migrations',
};

export function provideMigrationsCancelImportMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_CANCEL_IMPORT,
    'MIGRATIONS_CANCEL_IMPORT',
    initialBehavior,
    _meta,
  );
}
