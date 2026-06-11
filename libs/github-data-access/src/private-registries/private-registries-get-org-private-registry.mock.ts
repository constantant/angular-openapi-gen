import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PRIVATE_REGISTRIES_GET_ORG_PRIVATE_REGISTRY } from './private-registries-get-org-private-registry.token';
import type { PrivateRegistriesGetOrgPrivateRegistryResponse } from './private-registries-get-org-private-registry.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'private-registries/get-org-private-registry',
  path: '/orgs/{org}/private-registries/{secret_name}',
  method: 'get',
  tag: 'private-registries',
};

export function providePrivateRegistriesGetOrgPrivateRegistryMock(
  initialBehavior?: ProviderInitialBehavior<PrivateRegistriesGetOrgPrivateRegistryResponse>,
): FactoryProvider {
  return provideMockResource(
    PRIVATE_REGISTRIES_GET_ORG_PRIVATE_REGISTRY,
    'PRIVATE_REGISTRIES_GET_ORG_PRIVATE_REGISTRY',
    initialBehavior,
    _meta,
  );
}
