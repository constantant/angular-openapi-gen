import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DELETE_ORDER } from './delete-order.token';

export function provideDeleteOrderMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(DELETE_ORDER, 'DELETE_ORDER', initialBehavior);
}
