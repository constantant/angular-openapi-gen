import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GET_ORDER_BY_ID } from './get-order-by-id.token';
import type { GetOrderByIdResponse } from './get-order-by-id.token';

export function provideGetOrderByIdMock(
  initialBehavior?: ProviderInitialBehavior<GetOrderByIdResponse>,
): FactoryProvider {
  return provideMockResource(
    GET_ORDER_BY_ID,
    'GET_ORDER_BY_ID',
    initialBehavior,
  );
}
