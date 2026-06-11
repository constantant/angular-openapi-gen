import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { META_GET } from './meta-get.token';
import type { MetaGetResponse } from './meta-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'meta/get',
  path: '/meta',
  method: 'get',
  tag: 'meta',
};

export function provideMetaGetMock(
  initialBehavior?: ProviderInitialBehavior<MetaGetResponse>,
): FactoryProvider {
  return provideMockResource(META_GET, 'META_GET', initialBehavior, _meta);
}
