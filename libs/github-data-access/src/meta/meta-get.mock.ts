import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { META_GET } from './meta-get.token';
import type { MetaGetResponse } from './meta-get.token';

export function provideMetaGetMock(
  initialBehavior?: ProviderInitialBehavior<MetaGetResponse>,
): FactoryProvider {
  return provideMockResource(META_GET, 'META_GET', initialBehavior);
}
