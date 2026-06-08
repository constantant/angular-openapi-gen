import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PRIVATE_REGISTRIES_UPDATE_ORG_PRIVATE_REGISTRY } from './private-registries-update-org-private-registry.token';

export function providePrivateRegistriesUpdateOrgPrivateRegistryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PRIVATE_REGISTRIES_UPDATE_ORG_PRIVATE_REGISTRY,
    'PRIVATE_REGISTRIES_UPDATE_ORG_PRIVATE_REGISTRY',
    initialBehavior,
  );
}
