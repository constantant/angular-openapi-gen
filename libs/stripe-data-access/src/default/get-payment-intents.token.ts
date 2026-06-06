import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentIntentsParams =
  paths['/v1/payment_intents']['get']['parameters']['query'];

type GetPaymentIntentsResponse =
  paths['/v1/payment_intents']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_INTENTS = new InjectionToken<
  (
    params?: GetPaymentIntentsParams,
  ) => ReturnType<typeof httpResource<GetPaymentIntentsResponse>>
>('GET_PAYMENT_INTENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetPaymentIntentsParams) =>
      httpResource<GetPaymentIntentsResponse>(() => ({
        url: `${base}/v1/payment_intents`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
