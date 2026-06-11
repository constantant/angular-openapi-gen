import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ARTIFACT_DEPLOYMENT_RECORDS } from './orgs-list-artifact-deployment-records.token';
import type { OrgsListArtifactDeploymentRecordsResponse } from './orgs-list-artifact-deployment-records.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-artifact-deployment-records',
  path: '/orgs/{org}/artifacts/{subject_digest}/metadata/deployment-records',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListArtifactDeploymentRecordsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListArtifactDeploymentRecordsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ARTIFACT_DEPLOYMENT_RECORDS,
    'ORGS_LIST_ARTIFACT_DEPLOYMENT_RECORDS',
    initialBehavior,
    _meta,
  );
}
