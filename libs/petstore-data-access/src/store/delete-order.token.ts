import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export const DELETE_ORDER = new InjectionToken<
  (orderId: string) => ReturnType<typeof httpResource<unknown>>
>('DELETE_ORDER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (orderId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/store/order/${orderId}`,
        method: 'DELETE',
      }));
  },
});
