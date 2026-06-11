import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_LIST } from './gists-list.token';
import type { GistsListResponse } from './gists-list.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/list',
  path: '/gists',
  method: 'get',
  tag: 'gists',
};

export function provideGistsListMock(
  initialBehavior?: ProviderInitialBehavior<GistsListResponse>,
): FactoryProvider {
  return provideMockResource(GISTS_LIST, 'GISTS_LIST', initialBehavior, _meta);
}
