import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DELETE_ORDER } from './delete-order.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'deleteOrder',
  path: '/store/order/{orderId}',
  method: 'delete',
  tag: 'store',
  args: ['orderId', 'options'],
};

export function provideDeleteOrderMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    DELETE_ORDER,
    'DELETE_ORDER',
    initialBehavior,
    _meta,
    options,
  );
}
