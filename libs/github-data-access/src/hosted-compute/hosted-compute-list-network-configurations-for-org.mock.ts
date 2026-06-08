import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { HOSTED_COMPUTE_LIST_NETWORK_CONFIGURATIONS_FOR_ORG } from './hosted-compute-list-network-configurations-for-org.token';
import type { HostedComputeListNetworkConfigurationsForOrgResponse } from './hosted-compute-list-network-configurations-for-org.token';

export function provideHostedComputeListNetworkConfigurationsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<HostedComputeListNetworkConfigurationsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    HOSTED_COMPUTE_LIST_NETWORK_CONFIGURATIONS_FOR_ORG,
    'HOSTED_COMPUTE_LIST_NETWORK_CONFIGURATIONS_FOR_ORG',
    initialBehavior,
  );
}
