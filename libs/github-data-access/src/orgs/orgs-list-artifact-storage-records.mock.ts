import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ARTIFACT_STORAGE_RECORDS } from './orgs-list-artifact-storage-records.token';
import type { OrgsListArtifactStorageRecordsResponse } from './orgs-list-artifact-storage-records.token';

export function provideOrgsListArtifactStorageRecordsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListArtifactStorageRecordsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ARTIFACT_STORAGE_RECORDS,
    'ORGS_LIST_ARTIFACT_STORAGE_RECORDS',
    initialBehavior,
  );
}
