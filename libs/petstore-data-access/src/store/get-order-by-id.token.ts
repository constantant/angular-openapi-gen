import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type GetOrderByIdResponse =
  paths['/store/order/{orderId}']['get']['responses']['200']['content']['application/json'];

export const GET_ORDER_BY_ID = new InjectionToken<
  (orderId: string) => ReturnType<typeof httpResource<GetOrderByIdResponse>>
>('GET_ORDER_BY_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (orderId: string) =>
      httpResource<GetOrderByIdResponse>(() => ({
        url: `${base}/store/order/${orderId}`,
      }));
  },
});
