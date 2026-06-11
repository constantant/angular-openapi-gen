import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_LIST_CODEQL_DATABASES } from './code-scanning-list-codeql-databases.token';
import type { CodeScanningListCodeqlDatabasesResponse } from './code-scanning-list-codeql-databases.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/list-codeql-databases',
  path: '/repos/{owner}/{repo}/code-scanning/codeql/databases',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningListCodeqlDatabasesMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningListCodeqlDatabasesResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_LIST_CODEQL_DATABASES,
    'CODE_SCANNING_LIST_CODEQL_DATABASES',
    initialBehavior,
    _meta,
  );
}
