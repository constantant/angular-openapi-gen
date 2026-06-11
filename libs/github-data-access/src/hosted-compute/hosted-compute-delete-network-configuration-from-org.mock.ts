import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { HOSTED_COMPUTE_DELETE_NETWORK_CONFIGURATION_FROM_ORG } from './hosted-compute-delete-network-configuration-from-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'hosted-compute/delete-network-configuration-from-org',
  path: '/orgs/{org}/settings/network-configurations/{network_configuration_id}',
  method: 'delete',
  tag: 'hosted-compute',
};

export function provideHostedComputeDeleteNetworkConfigurationFromOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    HOSTED_COMPUTE_DELETE_NETWORK_CONFIGURATION_FROM_ORG,
    'HOSTED_COMPUTE_DELETE_NETWORK_CONFIGURATION_FROM_ORG',
    initialBehavior,
    _meta,
  );
}
