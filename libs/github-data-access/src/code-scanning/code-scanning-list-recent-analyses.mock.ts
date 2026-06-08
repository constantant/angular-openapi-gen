import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_LIST_RECENT_ANALYSES } from './code-scanning-list-recent-analyses.token';
import type { CodeScanningListRecentAnalysesResponse } from './code-scanning-list-recent-analyses.token';

export function provideCodeScanningListRecentAnalysesMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningListRecentAnalysesResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_LIST_RECENT_ANALYSES,
    'CODE_SCANNING_LIST_RECENT_ANALYSES',
    initialBehavior,
  );
}
