import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_DELETE_CODEQL_DATABASE } from './code-scanning-delete-codeql-database.token';

export function provideCodeScanningDeleteCodeqlDatabaseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_DELETE_CODEQL_DATABASE,
    'CODE_SCANNING_DELETE_CODEQL_DATABASE',
    initialBehavior,
  );
}
