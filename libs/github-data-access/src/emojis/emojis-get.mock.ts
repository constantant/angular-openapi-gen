import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { EMOJIS_GET } from './emojis-get.token';
import type { EmojisGetResponse } from './emojis-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'emojis/get',
  path: '/emojis',
  method: 'get',
  tag: 'emojis',
};

export function provideEmojisGetMock(
  initialBehavior?: ProviderInitialBehavior<EmojisGetResponse>,
): FactoryProvider {
  return provideMockResource(EMOJIS_GET, 'EMOJIS_GET', initialBehavior, _meta);
}
