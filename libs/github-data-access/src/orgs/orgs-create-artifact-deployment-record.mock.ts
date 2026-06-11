import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CREATE_ARTIFACT_DEPLOYMENT_RECORD } from './orgs-create-artifact-deployment-record.token';
import type { OrgsCreateArtifactDeploymentRecordResponse } from './orgs-create-artifact-deployment-record.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/create-artifact-deployment-record',
  path: '/orgs/{org}/artifacts/metadata/deployment-record',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsCreateArtifactDeploymentRecordMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCreateArtifactDeploymentRecordResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CREATE_ARTIFACT_DEPLOYMENT_RECORD,
    'ORGS_CREATE_ARTIFACT_DEPLOYMENT_RECORD',
    initialBehavior,
    _meta,
  );
}
