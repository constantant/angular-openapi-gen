import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CREATE_ARTIFACT_DEPLOYMENT_RECORD } from './orgs-create-artifact-deployment-record.token';
import type { OrgsCreateArtifactDeploymentRecordResponse } from './orgs-create-artifact-deployment-record.token';

export function provideOrgsCreateArtifactDeploymentRecordMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCreateArtifactDeploymentRecordResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CREATE_ARTIFACT_DEPLOYMENT_RECORD,
    'ORGS_CREATE_ARTIFACT_DEPLOYMENT_RECORD',
    initialBehavior,
  );
}
