import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { HOSTED_COMPUTE_GET_NETWORK_CONFIGURATION_FOR_ORG } from './hosted-compute-get-network-configuration-for-org.token';
import type { HostedComputeGetNetworkConfigurationForOrgResponse } from './hosted-compute-get-network-configuration-for-org.token';

export function provideHostedComputeGetNetworkConfigurationForOrgMock(
  initialBehavior?: ProviderInitialBehavior<HostedComputeGetNetworkConfigurationForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    HOSTED_COMPUTE_GET_NETWORK_CONFIGURATION_FOR_ORG,
    'HOSTED_COMPUTE_GET_NETWORK_CONFIGURATION_FOR_ORG',
    initialBehavior,
  );
}
