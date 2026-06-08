import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_SET_CLUSTER_DEPLOYMENT_RECORDS } from './orgs-set-cluster-deployment-records.token';
import type { OrgsSetClusterDeploymentRecordsResponse } from './orgs-set-cluster-deployment-records.token';

export function provideOrgsSetClusterDeploymentRecordsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsSetClusterDeploymentRecordsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_SET_CLUSTER_DEPLOYMENT_RECORDS,
    'ORGS_SET_CLUSTER_DEPLOYMENT_RECORDS',
    initialBehavior,
  );
}
