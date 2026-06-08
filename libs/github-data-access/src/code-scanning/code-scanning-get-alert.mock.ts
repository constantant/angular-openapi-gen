import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_ALERT } from './code-scanning-get-alert.token';
import type { CodeScanningGetAlertResponse } from './code-scanning-get-alert.token';

export function provideCodeScanningGetAlertMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_ALERT,
    'CODE_SCANNING_GET_ALERT',
    initialBehavior,
  );
}
