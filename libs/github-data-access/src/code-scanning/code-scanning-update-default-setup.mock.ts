import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_UPDATE_DEFAULT_SETUP } from './code-scanning-update-default-setup.token';
import type { CodeScanningUpdateDefaultSetupResponse } from './code-scanning-update-default-setup.token';

export function provideCodeScanningUpdateDefaultSetupMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningUpdateDefaultSetupResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_UPDATE_DEFAULT_SETUP,
    'CODE_SCANNING_UPDATE_DEFAULT_SETUP',
    initialBehavior,
  );
}
