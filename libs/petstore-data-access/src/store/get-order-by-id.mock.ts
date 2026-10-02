import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GET_ORDER_BY_ID } from './get-order-by-id.token';
import type { GetOrderByIdResponse } from './get-order-by-id.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'getOrderById',
  path: '/store/order/{orderId}',
  method: 'get',
  tag: 'store',
  args: ['orderId', 'options'],
};

export function provideGetOrderByIdMock(
  initialBehavior?: ProviderInitialBehavior<GetOrderByIdResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    GET_ORDER_BY_ID,
    'GET_ORDER_BY_ID',
    initialBehavior,
    _meta,
    options,
  );
}
