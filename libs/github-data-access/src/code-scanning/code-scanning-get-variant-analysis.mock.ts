import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_VARIANT_ANALYSIS } from './code-scanning-get-variant-analysis.token';
import type { CodeScanningGetVariantAnalysisResponse } from './code-scanning-get-variant-analysis.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/get-variant-analysis',
  path: '/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningGetVariantAnalysisMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetVariantAnalysisResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_VARIANT_ANALYSIS,
    'CODE_SCANNING_GET_VARIANT_ANALYSIS',
    initialBehavior,
    _meta,
  );
}
