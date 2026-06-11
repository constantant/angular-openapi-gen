import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_DELETE_ANALYSIS } from './code-scanning-delete-analysis.token';
import type { CodeScanningDeleteAnalysisResponse } from './code-scanning-delete-analysis.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/delete-analysis',
  path: '/repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}',
  method: 'delete',
  tag: 'code-scanning',
};

export function provideCodeScanningDeleteAnalysisMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningDeleteAnalysisResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_DELETE_ANALYSIS,
    'CODE_SCANNING_DELETE_ANALYSIS',
    initialBehavior,
    _meta,
  );
}
