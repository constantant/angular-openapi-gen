import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type PlaceOrderBody = NonNullable<
  paths['/store/order']['post']['requestBody']
>['content']['application/json'];

export type PlaceOrderResponse =
  paths['/store/order']['post']['responses']['200']['content']['application/json'];

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

function _validateResponse(value: unknown): PlaceOrderResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `PlaceOrder response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as PlaceOrderResponse;
}

export const PLACE_ORDER = new InjectionToken<
  (body: PlaceOrderBody) => Observable<PlaceOrderResponse>
>('PLACE_ORDER');

export function providePlaceOrder(): FactoryProvider {
  return {
    provide: PLACE_ORDER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(PETSTORE_BASE_URL);
      return (body: PlaceOrderBody) =>
        http
          .request<PlaceOrderResponse>('POST', `${base}/store/order`, {
            body,
          })
          .pipe(map(_validateResponse));
    },
  };
}
