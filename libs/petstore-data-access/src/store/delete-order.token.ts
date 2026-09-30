import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export const DELETE_ORDER = new InjectionToken<
  (orderId: string) => Observable<unknown>
>('DELETE_ORDER');

export function provideDeleteOrder(): FactoryProvider {
  return {
    provide: DELETE_ORDER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(PETSTORE_BASE_URL);
      return (orderId: string) =>
        http.request<unknown>('DELETE', `${base}/store/order/${orderId}`, {});
    },
  };
}
