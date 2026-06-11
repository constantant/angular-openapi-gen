import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { HOSTED_COMPUTE_CREATE_NETWORK_CONFIGURATION_FOR_ORG } from './hosted-compute-create-network-configuration-for-org.token';
import type { HostedComputeCreateNetworkConfigurationForOrgResponse } from './hosted-compute-create-network-configuration-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'hosted-compute/create-network-configuration-for-org',
  path: '/orgs/{org}/settings/network-configurations',
  method: 'post',
  tag: 'hosted-compute',
};

export function provideHostedComputeCreateNetworkConfigurationForOrgMock(
  initialBehavior?: ProviderInitialBehavior<HostedComputeCreateNetworkConfigurationForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    HOSTED_COMPUTE_CREATE_NETWORK_CONFIGURATION_FOR_ORG,
    'HOSTED_COMPUTE_CREATE_NETWORK_CONFIGURATION_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
