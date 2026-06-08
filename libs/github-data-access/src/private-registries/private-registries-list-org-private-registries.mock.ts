import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PRIVATE_REGISTRIES_LIST_ORG_PRIVATE_REGISTRIES } from './private-registries-list-org-private-registries.token';
import type { PrivateRegistriesListOrgPrivateRegistriesResponse } from './private-registries-list-org-private-registries.token';

export function providePrivateRegistriesListOrgPrivateRegistriesMock(
  initialBehavior?: ProviderInitialBehavior<PrivateRegistriesListOrgPrivateRegistriesResponse>,
): FactoryProvider {
  return provideMockResource(
    PRIVATE_REGISTRIES_LIST_ORG_PRIVATE_REGISTRIES,
    'PRIVATE_REGISTRIES_LIST_ORG_PRIVATE_REGISTRIES',
    initialBehavior,
  );
}
