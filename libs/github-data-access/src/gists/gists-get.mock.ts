import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_GET } from './gists-get.token';
import type { GistsGetResponse } from './gists-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/get',
  path: '/gists/{gist_id}',
  method: 'get',
  tag: 'gists',
};

export function provideGistsGetMock(
  initialBehavior?: ProviderInitialBehavior<GistsGetResponse>,
): FactoryProvider {
  return provideMockResource(GISTS_GET, 'GISTS_GET', initialBehavior, _meta);
}
