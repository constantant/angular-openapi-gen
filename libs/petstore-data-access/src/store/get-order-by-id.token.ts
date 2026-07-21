import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type GetOrderByIdResponse =
  paths['/store/order/{orderId}']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
      example: 10,
    },
    petId: {
      type: 'integer',
      format: 'int64',
      example: 198772,
    },
    quantity: {
      type: 'integer',
      format: 'int32',
      example: 7,
    },
    shipDate: {
      type: 'string',
      format: 'date-time',
    },
    status: {
      type: 'string',
      description: 'Order Status',
      example: 'approved',
      enum: ['placed', 'approved', 'delivered'],
    },
    complete: {
      type: 'boolean',
    },
  },
  xml: {
    name: 'order',
  },
};

function _validateResponse(value: unknown): GetOrderByIdResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `GetOrderById response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as GetOrderByIdResponse;
}

export const GET_ORDER_BY_ID = new InjectionToken<
  (orderId: string) => ReturnType<typeof httpResource<GetOrderByIdResponse>>
>('GET_ORDER_BY_ID');

export function provideGetOrderById(): FactoryProvider {
  return {
    provide: GET_ORDER_BY_ID,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return (orderId: string) =>
        httpResource<GetOrderByIdResponse>(
          () => ({
            url: `${base}/store/order/${orderId}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
