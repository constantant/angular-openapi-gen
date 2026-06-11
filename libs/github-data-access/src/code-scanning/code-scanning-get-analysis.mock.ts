import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_ANALYSIS } from './code-scanning-get-analysis.token';
import type { CodeScanningGetAnalysisResponse } from './code-scanning-get-analysis.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/get-analysis',
  path: '/repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningGetAnalysisMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetAnalysisResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_ANALYSIS,
    'CODE_SCANNING_GET_ANALYSIS',
    initialBehavior,
    _meta,
  );
}
