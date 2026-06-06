import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentMethodsParams =
  paths['/v1/payment_methods']['get']['parameters']['query'];

type GetPaymentMethodsResponse =
  paths['/v1/payment_methods']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_METHODS = new InjectionToken<
  (
    params?: GetPaymentMethodsParams,
  ) => ReturnType<typeof httpResource<GetPaymentMethodsResponse>>
>('GET_PAYMENT_METHODS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetPaymentMethodsParams) =>
      httpResource<GetPaymentMethodsResponse>(() => ({
        url: `${base}/v1/payment_methods`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
