import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_QUALITY_UPDATE_SETUP } from './code-quality-update-setup.token';
import type { CodeQualityUpdateSetupResponse } from './code-quality-update-setup.token';

export function provideCodeQualityUpdateSetupMock(
  initialBehavior?: ProviderInitialBehavior<CodeQualityUpdateSetupResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_QUALITY_UPDATE_SETUP,
    'CODE_QUALITY_UPDATE_SETUP',
    initialBehavior,
  );
}
