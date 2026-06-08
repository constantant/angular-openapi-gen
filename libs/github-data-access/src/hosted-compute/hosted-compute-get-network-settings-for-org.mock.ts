import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { HOSTED_COMPUTE_GET_NETWORK_SETTINGS_FOR_ORG } from './hosted-compute-get-network-settings-for-org.token';
import type { HostedComputeGetNetworkSettingsForOrgResponse } from './hosted-compute-get-network-settings-for-org.token';

export function provideHostedComputeGetNetworkSettingsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<HostedComputeGetNetworkSettingsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    HOSTED_COMPUTE_GET_NETWORK_SETTINGS_FOR_ORG,
    'HOSTED_COMPUTE_GET_NETWORK_SETTINGS_FOR_ORG',
    initialBehavior,
  );
}
