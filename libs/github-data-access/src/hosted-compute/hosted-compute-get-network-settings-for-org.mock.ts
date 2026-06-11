import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { HOSTED_COMPUTE_GET_NETWORK_SETTINGS_FOR_ORG } from './hosted-compute-get-network-settings-for-org.token';
import type { HostedComputeGetNetworkSettingsForOrgResponse } from './hosted-compute-get-network-settings-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'hosted-compute/get-network-settings-for-org',
  path: '/orgs/{org}/settings/network-settings/{network_settings_id}',
  method: 'get',
  tag: 'hosted-compute',
};

export function provideHostedComputeGetNetworkSettingsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<HostedComputeGetNetworkSettingsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    HOSTED_COMPUTE_GET_NETWORK_SETTINGS_FOR_ORG,
    'HOSTED_COMPUTE_GET_NETWORK_SETTINGS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
