import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { UPLOAD_FILE } from './upload-file.token';
import type { UploadFileResponse } from './upload-file.token';

export function provideUploadFileMock(
  initialBehavior?: ProviderInitialBehavior<UploadFileResponse>,
): FactoryProvider {
  return provideMockResource(UPLOAD_FILE, 'UPLOAD_FILE', initialBehavior);
}
