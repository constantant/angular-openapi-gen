import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PRIVATE_REGISTRIES_GET_ORG_PUBLIC_KEY } from './private-registries-get-org-public-key.token';
import type { PrivateRegistriesGetOrgPublicKeyResponse } from './private-registries-get-org-public-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'private-registries/get-org-public-key',
  path: '/orgs/{org}/private-registries/public-key',
  method: 'get',
  tag: 'private-registries',
};

export function providePrivateRegistriesGetOrgPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<PrivateRegistriesGetOrgPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    PRIVATE_REGISTRIES_GET_ORG_PUBLIC_KEY,
    'PRIVATE_REGISTRIES_GET_ORG_PUBLIC_KEY',
    initialBehavior,
    _meta,
  );
}
