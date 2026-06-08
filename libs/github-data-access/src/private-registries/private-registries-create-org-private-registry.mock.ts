import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PRIVATE_REGISTRIES_CREATE_ORG_PRIVATE_REGISTRY } from './private-registries-create-org-private-registry.token';
import type { PrivateRegistriesCreateOrgPrivateRegistryResponse } from './private-registries-create-org-private-registry.token';

export function providePrivateRegistriesCreateOrgPrivateRegistryMock(
  initialBehavior?: ProviderInitialBehavior<PrivateRegistriesCreateOrgPrivateRegistryResponse>,
): FactoryProvider {
  return provideMockResource(
    PRIVATE_REGISTRIES_CREATE_ORG_PRIVATE_REGISTRY,
    'PRIVATE_REGISTRIES_CREATE_ORG_PRIVATE_REGISTRY',
    initialBehavior,
  );
}
