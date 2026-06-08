import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ARTIFACT_DEPLOYMENT_RECORDS } from './orgs-list-artifact-deployment-records.token';
import type { OrgsListArtifactDeploymentRecordsResponse } from './orgs-list-artifact-deployment-records.token';

export function provideOrgsListArtifactDeploymentRecordsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListArtifactDeploymentRecordsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ARTIFACT_DEPLOYMENT_RECORDS,
    'ORGS_LIST_ARTIFACT_DEPLOYMENT_RECORDS',
    initialBehavior,
  );
}
