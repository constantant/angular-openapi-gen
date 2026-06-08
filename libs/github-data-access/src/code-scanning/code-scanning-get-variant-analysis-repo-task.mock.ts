import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_VARIANT_ANALYSIS_REPO_TASK } from './code-scanning-get-variant-analysis-repo-task.token';
import type { CodeScanningGetVariantAnalysisRepoTaskResponse } from './code-scanning-get-variant-analysis-repo-task.token';

export function provideCodeScanningGetVariantAnalysisRepoTaskMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetVariantAnalysisRepoTaskResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_VARIANT_ANALYSIS_REPO_TASK,
    'CODE_SCANNING_GET_VARIANT_ANALYSIS_REPO_TASK',
    initialBehavior,
  );
}
