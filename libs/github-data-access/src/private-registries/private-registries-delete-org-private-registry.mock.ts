import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PRIVATE_REGISTRIES_DELETE_ORG_PRIVATE_REGISTRY } from './private-registries-delete-org-private-registry.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'private-registries/delete-org-private-registry',
  path: '/orgs/{org}/private-registries/{secret_name}',
  method: 'delete',
  tag: 'private-registries',
};

export function providePrivateRegistriesDeleteOrgPrivateRegistryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PRIVATE_REGISTRIES_DELETE_ORG_PRIVATE_REGISTRY,
    'PRIVATE_REGISTRIES_DELETE_ORG_PRIVATE_REGISTRY',
    initialBehavior,
    _meta,
  );
}
