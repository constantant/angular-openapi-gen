import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { META_GET_ZEN } from './meta-get-zen.token';

export function provideMetaGetZenMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(META_GET_ZEN, 'META_GET_ZEN', initialBehavior);
}
