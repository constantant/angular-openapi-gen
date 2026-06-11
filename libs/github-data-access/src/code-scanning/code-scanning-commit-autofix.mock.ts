import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_COMMIT_AUTOFIX } from './code-scanning-commit-autofix.token';
import type { CodeScanningCommitAutofixResponse } from './code-scanning-commit-autofix.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/commit-autofix',
  path: '/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix/commits',
  method: 'post',
  tag: 'code-scanning',
};

export function provideCodeScanningCommitAutofixMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningCommitAutofixResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_COMMIT_AUTOFIX,
    'CODE_SCANNING_COMMIT_AUTOFIX',
    initialBehavior,
    _meta,
  );
}
