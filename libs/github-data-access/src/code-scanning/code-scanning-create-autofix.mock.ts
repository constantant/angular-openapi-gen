import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_CREATE_AUTOFIX } from './code-scanning-create-autofix.token';
import type { CodeScanningCreateAutofixResponse } from './code-scanning-create-autofix.token';

export function provideCodeScanningCreateAutofixMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningCreateAutofixResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_CREATE_AUTOFIX,
    'CODE_SCANNING_CREATE_AUTOFIX',
    initialBehavior,
  );
}
