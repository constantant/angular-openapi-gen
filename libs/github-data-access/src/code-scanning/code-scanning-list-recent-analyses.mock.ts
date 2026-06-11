import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_LIST_RECENT_ANALYSES } from './code-scanning-list-recent-analyses.token';
import type { CodeScanningListRecentAnalysesResponse } from './code-scanning-list-recent-analyses.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/list-recent-analyses',
  path: '/repos/{owner}/{repo}/code-scanning/analyses',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningListRecentAnalysesMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningListRecentAnalysesResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_LIST_RECENT_ANALYSES,
    'CODE_SCANNING_LIST_RECENT_ANALYSES',
    initialBehavior,
    _meta,
  );
}
