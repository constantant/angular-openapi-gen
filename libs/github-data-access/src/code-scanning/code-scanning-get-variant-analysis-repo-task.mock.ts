import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_VARIANT_ANALYSIS_REPO_TASK } from './code-scanning-get-variant-analysis-repo-task.token';
import type { CodeScanningGetVariantAnalysisRepoTaskResponse } from './code-scanning-get-variant-analysis-repo-task.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/get-variant-analysis-repo-task',
  path: '/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}/repos/{repo_owner}/{repo_name}',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningGetVariantAnalysisRepoTaskMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetVariantAnalysisRepoTaskResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_VARIANT_ANALYSIS_REPO_TASK,
    'CODE_SCANNING_GET_VARIANT_ANALYSIS_REPO_TASK',
    initialBehavior,
    _meta,
  );
}
