import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { HOSTED_COMPUTE_GET_NETWORK_CONFIGURATION_FOR_ORG } from './hosted-compute-get-network-configuration-for-org.token';
import type { HostedComputeGetNetworkConfigurationForOrgResponse } from './hosted-compute-get-network-configuration-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'hosted-compute/get-network-configuration-for-org',
  path: '/orgs/{org}/settings/network-configurations/{network_configuration_id}',
  method: 'get',
  tag: 'hosted-compute',
};

export function provideHostedComputeGetNetworkConfigurationForOrgMock(
  initialBehavior?: ProviderInitialBehavior<HostedComputeGetNetworkConfigurationForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    HOSTED_COMPUTE_GET_NETWORK_CONFIGURATION_FOR_ORG,
    'HOSTED_COMPUTE_GET_NETWORK_CONFIGURATION_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
