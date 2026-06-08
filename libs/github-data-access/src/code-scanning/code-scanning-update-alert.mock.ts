import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_UPDATE_ALERT } from './code-scanning-update-alert.token';
import type { CodeScanningUpdateAlertResponse } from './code-scanning-update-alert.token';

export function provideCodeScanningUpdateAlertMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningUpdateAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_UPDATE_ALERT,
    'CODE_SCANNING_UPDATE_ALERT',
    initialBehavior,
  );
}
