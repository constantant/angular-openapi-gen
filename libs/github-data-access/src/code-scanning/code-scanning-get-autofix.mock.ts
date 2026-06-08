import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_AUTOFIX } from './code-scanning-get-autofix.token';
import type { CodeScanningGetAutofixResponse } from './code-scanning-get-autofix.token';

export function provideCodeScanningGetAutofixMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetAutofixResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_AUTOFIX,
    'CODE_SCANNING_GET_AUTOFIX',
    initialBehavior,
  );
}
