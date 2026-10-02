import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { splitCallOptions, type CallOptions } from '../request-options';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type DeleteOrderFn = (
  orderId: string,
  options?: CallOptions,
) => Observable<unknown>;

export const DELETE_ORDER = new InjectionToken<DeleteOrderFn>('DELETE_ORDER');

export function provideDeleteOrder(): FactoryProvider {
  return {
    provide: DELETE_ORDER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(PETSTORE_BASE_URL);
      return (orderId: string, options?: CallOptions) => {
        const _opts = splitCallOptions(options);
        return http.request<unknown>(
          'DELETE',
          `${base}/store/order/${orderId}`,
          {
            ..._opts.request,
            headers: {
              ..._opts.headers,
            },
          },
        );
      };
    },
  };
}
