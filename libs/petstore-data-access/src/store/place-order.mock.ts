import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PLACE_ORDER } from './place-order.token';
import type { PlaceOrderResponse } from './place-order.token';

export function providePlaceOrderMock(
  initialBehavior?: ProviderInitialBehavior<PlaceOrderResponse>,
): FactoryProvider {
  return provideMockResource(PLACE_ORDER, 'PLACE_ORDER', initialBehavior);
}
