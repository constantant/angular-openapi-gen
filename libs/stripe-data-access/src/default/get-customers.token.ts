import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersParams = paths['/v1/customers']['get']['parameters']['query'];

type GetCustomersResponse =
  paths['/v1/customers']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS = new InjectionToken<
  (
    params?: GetCustomersParams,
  ) => ReturnType<typeof httpResource<GetCustomersResponse>>
>('GET_CUSTOMERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetCustomersParams) =>
      httpResource<GetCustomersResponse>(() => ({
        url: `${base}/v1/customers`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
