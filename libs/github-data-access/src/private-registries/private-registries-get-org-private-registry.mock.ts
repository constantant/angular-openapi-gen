import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PRIVATE_REGISTRIES_GET_ORG_PRIVATE_REGISTRY } from './private-registries-get-org-private-registry.token';
import type { PrivateRegistriesGetOrgPrivateRegistryResponse } from './private-registries-get-org-private-registry.token';

export function providePrivateRegistriesGetOrgPrivateRegistryMock(
  initialBehavior?: ProviderInitialBehavior<PrivateRegistriesGetOrgPrivateRegistryResponse>,
): FactoryProvider {
  return provideMockResource(
    PRIVATE_REGISTRIES_GET_ORG_PRIVATE_REGISTRY,
    'PRIVATE_REGISTRIES_GET_ORG_PRIVATE_REGISTRY',
    initialBehavior,
  );
}
