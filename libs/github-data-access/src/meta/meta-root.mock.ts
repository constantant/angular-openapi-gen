import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { META_ROOT } from './meta-root.token';
import type { MetaRootResponse } from './meta-root.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'meta/root',
  path: '/',
  method: 'get',
  tag: 'meta',
};

export function provideMetaRootMock(
  initialBehavior?: ProviderInitialBehavior<MetaRootResponse>,
): FactoryProvider {
  return provideMockResource(META_ROOT, 'META_ROOT', initialBehavior, _meta);
}
