import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST } from './orgs-list.token';
import type { OrgsListResponse } from './orgs-list.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list',
  path: '/organizations',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListResponse>,
): FactoryProvider {
  return provideMockResource(ORGS_LIST, 'ORGS_LIST', initialBehavior, _meta);
}
