import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { META_GET_ZEN } from './meta-get-zen.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'meta/get-zen',
  path: '/zen',
  method: 'get',
  tag: 'meta',
};

export function provideMetaGetZenMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    META_GET_ZEN,
    'META_GET_ZEN',
    initialBehavior,
    _meta,
  );
}
