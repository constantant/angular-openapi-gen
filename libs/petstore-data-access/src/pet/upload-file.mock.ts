import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { UPLOAD_FILE } from './upload-file.token';
import type { UploadFileResponse } from './upload-file.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'uploadFile',
  path: '/pet/{petId}/uploadImage',
  method: 'post',
  tag: 'pet',
};

export function provideUploadFileMock(
  initialBehavior?: ProviderInitialBehavior<UploadFileResponse>,
): FactoryProvider {
  return provideMockResource(
    UPLOAD_FILE,
    'UPLOAD_FILE',
    initialBehavior,
    _meta,
  );
}
