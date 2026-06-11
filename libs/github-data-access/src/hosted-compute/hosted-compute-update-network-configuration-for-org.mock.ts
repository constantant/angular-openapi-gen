import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { HOSTED_COMPUTE_UPDATE_NETWORK_CONFIGURATION_FOR_ORG } from './hosted-compute-update-network-configuration-for-org.token';
import type { HostedComputeUpdateNetworkConfigurationForOrgResponse } from './hosted-compute-update-network-configuration-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'hosted-compute/update-network-configuration-for-org',
  path: '/orgs/{org}/settings/network-configurations/{network_configuration_id}',
  method: 'patch',
  tag: 'hosted-compute',
};

export function provideHostedComputeUpdateNetworkConfigurationForOrgMock(
  initialBehavior?: ProviderInitialBehavior<HostedComputeUpdateNetworkConfigurationForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    HOSTED_COMPUTE_UPDATE_NETWORK_CONFIGURATION_FOR_ORG,
    'HOSTED_COMPUTE_UPDATE_NETWORK_CONFIGURATION_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
