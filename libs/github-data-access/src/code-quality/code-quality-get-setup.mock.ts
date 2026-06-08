import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_QUALITY_GET_SETUP } from './code-quality-get-setup.token';
import type { CodeQualityGetSetupResponse } from './code-quality-get-setup.token';

export function provideCodeQualityGetSetupMock(
  initialBehavior?: ProviderInitialBehavior<CodeQualityGetSetupResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_QUALITY_GET_SETUP,
    'CODE_QUALITY_GET_SETUP',
    initialBehavior,
  );
}
