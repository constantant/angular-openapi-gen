import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_COMMIT_AUTOFIX } from './code-scanning-commit-autofix.token';
import type { CodeScanningCommitAutofixResponse } from './code-scanning-commit-autofix.token';

export function provideCodeScanningCommitAutofixMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningCommitAutofixResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_COMMIT_AUTOFIX,
    'CODE_SCANNING_COMMIT_AUTOFIX',
    initialBehavior,
  );
}
