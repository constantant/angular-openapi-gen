import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CREATE_ARTIFACT_STORAGE_RECORD } from './orgs-create-artifact-storage-record.token';
import type { OrgsCreateArtifactStorageRecordResponse } from './orgs-create-artifact-storage-record.token';

export function provideOrgsCreateArtifactStorageRecordMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCreateArtifactStorageRecordResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CREATE_ARTIFACT_STORAGE_RECORD,
    'ORGS_CREATE_ARTIFACT_STORAGE_RECORD',
    initialBehavior,
  );
}
