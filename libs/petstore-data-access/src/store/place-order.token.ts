import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type PlaceOrderBody = NonNullable<
  paths['/store/order']['post']['requestBody']
>['content']['application/json'];

type PlaceOrderResponse =
  paths['/store/order']['post']['responses']['200']['content']['application/json'];

export const PLACE_ORDER = new InjectionToken<
  (
    body: PlaceOrderBody | Signal<PlaceOrderBody>,
  ) => ReturnType<typeof httpResource<PlaceOrderResponse>>
>('PLACE_ORDER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (body: PlaceOrderBody | Signal<PlaceOrderBody>) =>
      httpResource<PlaceOrderResponse>(() => ({
        url: `${base}/store/order`,
        method: 'POST',
        body,
      }));
  },
});
