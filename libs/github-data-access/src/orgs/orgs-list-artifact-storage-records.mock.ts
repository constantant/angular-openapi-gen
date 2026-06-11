import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ARTIFACT_STORAGE_RECORDS } from './orgs-list-artifact-storage-records.token';
import type { OrgsListArtifactStorageRecordsResponse } from './orgs-list-artifact-storage-records.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-artifact-storage-records',
  path: '/orgs/{org}/artifacts/{subject_digest}/metadata/storage-records',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListArtifactStorageRecordsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListArtifactStorageRecordsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ARTIFACT_STORAGE_RECORDS,
    'ORGS_LIST_ARTIFACT_STORAGE_RECORDS',
    initialBehavior,
    _meta,
  );
}
