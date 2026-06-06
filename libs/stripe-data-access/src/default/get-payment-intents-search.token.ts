import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentIntentsSearchParams =
  paths['/v1/payment_intents/search']['get']['parameters']['query'];

type GetPaymentIntentsSearchResponse =
  paths['/v1/payment_intents/search']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_INTENTS_SEARCH = new InjectionToken<
  (
    params?: GetPaymentIntentsSearchParams,
  ) => ReturnType<typeof httpResource<GetPaymentIntentsSearchResponse>>
>('GET_PAYMENT_INTENTS_SEARCH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetPaymentIntentsSearchParams) =>
      httpResource<GetPaymentIntentsSearchResponse>(() => ({
        url: `${base}/v1/payment_intents/search`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
