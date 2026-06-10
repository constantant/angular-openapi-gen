import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DELETE_ORDER } from './delete-order.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'deleteOrder',
  path: '/store/order/{orderId}',
  method: 'delete',
  tag: 'store',
};

export function provideDeleteOrderMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DELETE_ORDER,
    'DELETE_ORDER',
    initialBehavior,
    _meta,
  );
}
