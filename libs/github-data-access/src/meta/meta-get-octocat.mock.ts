import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { META_GET_OCTOCAT } from './meta-get-octocat.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'meta/get-octocat',
  path: '/octocat',
  method: 'get',
  tag: 'meta',
};

export function provideMetaGetOctocatMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    META_GET_OCTOCAT,
    'META_GET_OCTOCAT',
    initialBehavior,
    _meta,
  );
}
