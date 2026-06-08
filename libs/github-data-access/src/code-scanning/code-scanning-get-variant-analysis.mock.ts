import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_VARIANT_ANALYSIS } from './code-scanning-get-variant-analysis.token';
import type { CodeScanningGetVariantAnalysisResponse } from './code-scanning-get-variant-analysis.token';

export function provideCodeScanningGetVariantAnalysisMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetVariantAnalysisResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_VARIANT_ANALYSIS,
    'CODE_SCANNING_GET_VARIANT_ANALYSIS',
    initialBehavior,
  );
}
