import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_UPLOAD_SARIF } from './code-scanning-upload-sarif.token';
import type { CodeScanningUploadSarifResponse } from './code-scanning-upload-sarif.token';

export function provideCodeScanningUploadSarifMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningUploadSarifResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_UPLOAD_SARIF,
    'CODE_SCANNING_UPLOAD_SARIF',
    initialBehavior,
  );
}
