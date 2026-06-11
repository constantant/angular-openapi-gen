import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CREATE_ARTIFACT_STORAGE_RECORD } from './orgs-create-artifact-storage-record.token';
import type { OrgsCreateArtifactStorageRecordResponse } from './orgs-create-artifact-storage-record.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/create-artifact-storage-record',
  path: '/orgs/{org}/artifacts/metadata/storage-record',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsCreateArtifactStorageRecordMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCreateArtifactStorageRecordResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CREATE_ARTIFACT_STORAGE_RECORD,
    'ORGS_CREATE_ARTIFACT_STORAGE_RECORD',
    initialBehavior,
    _meta,
  );
}
