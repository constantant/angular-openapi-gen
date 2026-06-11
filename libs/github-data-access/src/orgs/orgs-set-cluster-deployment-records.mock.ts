import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_SET_CLUSTER_DEPLOYMENT_RECORDS } from './orgs-set-cluster-deployment-records.token';
import type { OrgsSetClusterDeploymentRecordsResponse } from './orgs-set-cluster-deployment-records.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/set-cluster-deployment-records',
  path: '/orgs/{org}/artifacts/metadata/deployment-record/cluster/{cluster}',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsSetClusterDeploymentRecordsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsSetClusterDeploymentRecordsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_SET_CLUSTER_DEPLOYMENT_RECORDS,
    'ORGS_SET_CLUSTER_DEPLOYMENT_RECORDS',
    initialBehavior,
    _meta,
  );
}
