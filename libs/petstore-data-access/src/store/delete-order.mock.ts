import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { provideDeleteOrder } from './delete-order.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'deleteOrder',
  path: '/store/order/{orderId}',
  method: 'delete',
  tag: 'store',
};

export const DELETE_ORDER_MOCK: MockEndpoint<unknown> = {
  key: 'DELETE_ORDER',
  baseUrl: PETSTORE_BASE_URL,
  meta: _meta,
  provide: provideDeleteOrder,
};

export function provideDeleteOrderMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(DELETE_ORDER_MOCK, initialBehavior);
}
