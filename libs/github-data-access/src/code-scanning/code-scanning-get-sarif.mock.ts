import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_SARIF } from './code-scanning-get-sarif.token';
import type { CodeScanningGetSarifResponse } from './code-scanning-get-sarif.token';

export function provideCodeScanningGetSarifMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetSarifResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_SARIF,
    'CODE_SCANNING_GET_SARIF',
    initialBehavior,
  );
}
