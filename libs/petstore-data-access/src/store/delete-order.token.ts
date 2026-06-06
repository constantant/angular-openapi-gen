import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type DeleteOrderResponse =
  paths['/store/order/{orderId}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_ORDER = new InjectionToken<
  (orderId: string) => ReturnType<typeof httpResource<DeleteOrderResponse>>
>('DELETE_ORDER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (orderId: string) =>
      httpResource<DeleteOrderResponse>(() => ({
        url: `${base}/store/order/${orderId}`,
        method: 'DELETE',
      }));
  },
});
