import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { HOSTED_COMPUTE_CREATE_NETWORK_CONFIGURATION_FOR_ORG } from './hosted-compute-create-network-configuration-for-org.token';
import type { HostedComputeCreateNetworkConfigurationForOrgResponse } from './hosted-compute-create-network-configuration-for-org.token';

export function provideHostedComputeCreateNetworkConfigurationForOrgMock(
  initialBehavior?: ProviderInitialBehavior<HostedComputeCreateNetworkConfigurationForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    HOSTED_COMPUTE_CREATE_NETWORK_CONFIGURATION_FOR_ORG,
    'HOSTED_COMPUTE_CREATE_NETWORK_CONFIGURATION_FOR_ORG',
    initialBehavior,
  );
}
