import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { HOSTED_COMPUTE_LIST_NETWORK_CONFIGURATIONS_FOR_ORG } from './hosted-compute-list-network-configurations-for-org.token';
import type { HostedComputeListNetworkConfigurationsForOrgResponse } from './hosted-compute-list-network-configurations-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'hosted-compute/list-network-configurations-for-org',
  path: '/orgs/{org}/settings/network-configurations',
  method: 'get',
  tag: 'hosted-compute',
};

export function provideHostedComputeListNetworkConfigurationsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<HostedComputeListNetworkConfigurationsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    HOSTED_COMPUTE_LIST_NETWORK_CONFIGURATIONS_FOR_ORG,
    'HOSTED_COMPUTE_LIST_NETWORK_CONFIGURATIONS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
