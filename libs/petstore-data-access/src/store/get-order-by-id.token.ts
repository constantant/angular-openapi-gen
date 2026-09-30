import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
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
  (orderId: string) => Observable<GetOrderByIdResponse>
>('GET_ORDER_BY_ID');

export function provideGetOrderById(): FactoryProvider {
  return {
    provide: GET_ORDER_BY_ID,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(PETSTORE_BASE_URL);
      return (orderId: string) =>
        http
          .request<GetOrderByIdResponse>(
            'GET',
            `${base}/store/order/${orderId}`,
            {},
          )
          .pipe(map(_validateResponse));
    },
  };
}
