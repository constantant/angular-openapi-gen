import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_CODEQL_DATABASE } from './code-scanning-get-codeql-database.token';
import type { CodeScanningGetCodeqlDatabaseResponse } from './code-scanning-get-codeql-database.token';

export function provideCodeScanningGetCodeqlDatabaseMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetCodeqlDatabaseResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_CODEQL_DATABASE,
    'CODE_SCANNING_GET_CODEQL_DATABASE',
    initialBehavior,
  );
}
