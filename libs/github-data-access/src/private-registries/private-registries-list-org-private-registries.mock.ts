import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PRIVATE_REGISTRIES_LIST_ORG_PRIVATE_REGISTRIES } from './private-registries-list-org-private-registries.token';
import type { PrivateRegistriesListOrgPrivateRegistriesResponse } from './private-registries-list-org-private-registries.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'private-registries/list-org-private-registries',
  path: '/orgs/{org}/private-registries',
  method: 'get',
  tag: 'private-registries',
};

export function providePrivateRegistriesListOrgPrivateRegistriesMock(
  initialBehavior?: ProviderInitialBehavior<PrivateRegistriesListOrgPrivateRegistriesResponse>,
): FactoryProvider {
  return provideMockResource(
    PRIVATE_REGISTRIES_LIST_ORG_PRIVATE_REGISTRIES,
    'PRIVATE_REGISTRIES_LIST_ORG_PRIVATE_REGISTRIES',
    initialBehavior,
    _meta,
  );
}
