import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { EMOJIS_GET } from './emojis-get.token';
import type { EmojisGetResponse } from './emojis-get.token';

export function provideEmojisGetMock(
  initialBehavior?: ProviderInitialBehavior<EmojisGetResponse>,
): FactoryProvider {
  return provideMockResource(EMOJIS_GET, 'EMOJIS_GET', initialBehavior);
}
