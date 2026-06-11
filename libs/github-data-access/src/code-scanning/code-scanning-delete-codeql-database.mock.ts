import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_DELETE_CODEQL_DATABASE } from './code-scanning-delete-codeql-database.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/delete-codeql-database',
  path: '/repos/{owner}/{repo}/code-scanning/codeql/databases/{language}',
  method: 'delete',
  tag: 'code-scanning',
};

export function provideCodeScanningDeleteCodeqlDatabaseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_DELETE_CODEQL_DATABASE,
    'CODE_SCANNING_DELETE_CODEQL_DATABASE',
    initialBehavior,
    _meta,
  );
}
