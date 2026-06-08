import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_ANALYSIS } from './code-scanning-get-analysis.token';
import type { CodeScanningGetAnalysisResponse } from './code-scanning-get-analysis.token';

export function provideCodeScanningGetAnalysisMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetAnalysisResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_ANALYSIS,
    'CODE_SCANNING_GET_ANALYSIS',
    initialBehavior,
  );
}
