import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_GET } from './orgs-get.token';
import type { OrgsGetResponse } from './orgs-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/get',
  path: '/orgs/{org}',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsGetMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetResponse>,
): FactoryProvider {
  return provideMockResource(ORGS_GET, 'ORGS_GET', initialBehavior, _meta);
}
