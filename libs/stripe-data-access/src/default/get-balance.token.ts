import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBalanceParams = paths['/v1/balance']['get']['parameters']['query'];

type GetBalanceResponse =
  paths['/v1/balance']['get']['responses']['200']['content']['application/json'];

export const GET_BALANCE = new InjectionToken<
  (
    params?: GetBalanceParams,
  ) => ReturnType<typeof httpResource<GetBalanceResponse>>
>('GET_BALANCE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetBalanceParams) =>
      httpResource<GetBalanceResponse>(() => ({
        url: `${base}/v1/balance`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
