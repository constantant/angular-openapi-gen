import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_CODEQL_DATABASE } from './code-scanning-get-codeql-database.token';
import type { CodeScanningGetCodeqlDatabaseResponse } from './code-scanning-get-codeql-database.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/get-codeql-database',
  path: '/repos/{owner}/{repo}/code-scanning/codeql/databases/{language}',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningGetCodeqlDatabaseMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetCodeqlDatabaseResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_CODEQL_DATABASE,
    'CODE_SCANNING_GET_CODEQL_DATABASE',
    initialBehavior,
    _meta,
  );
}
