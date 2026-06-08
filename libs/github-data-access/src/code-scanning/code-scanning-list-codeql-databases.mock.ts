import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_LIST_CODEQL_DATABASES } from './code-scanning-list-codeql-databases.token';
import type { CodeScanningListCodeqlDatabasesResponse } from './code-scanning-list-codeql-databases.token';

export function provideCodeScanningListCodeqlDatabasesMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningListCodeqlDatabasesResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_LIST_CODEQL_DATABASES,
    'CODE_SCANNING_LIST_CODEQL_DATABASES',
    initialBehavior,
  );
}
