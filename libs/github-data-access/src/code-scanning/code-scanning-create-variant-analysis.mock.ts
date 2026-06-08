import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_CREATE_VARIANT_ANALYSIS } from './code-scanning-create-variant-analysis.token';
import type { CodeScanningCreateVariantAnalysisResponse } from './code-scanning-create-variant-analysis.token';

export function provideCodeScanningCreateVariantAnalysisMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningCreateVariantAnalysisResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_CREATE_VARIANT_ANALYSIS,
    'CODE_SCANNING_CREATE_VARIANT_ANALYSIS',
    initialBehavior,
  );
}
