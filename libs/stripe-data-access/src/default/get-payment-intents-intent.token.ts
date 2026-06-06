import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentIntentsIntentParams =
  paths['/v1/payment_intents/{intent}']['get']['parameters']['query'];

type GetPaymentIntentsIntentResponse =
  paths['/v1/payment_intents/{intent}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_INTENTS_INTENT = new InjectionToken<
  (
    intent: string,
    params?: GetPaymentIntentsIntentParams,
  ) => ReturnType<typeof httpResource<GetPaymentIntentsIntentResponse>>
>('GET_PAYMENT_INTENTS_INTENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (intent: string, params?: GetPaymentIntentsIntentParams) =>
      httpResource<GetPaymentIntentsIntentResponse>(() => ({
        url: `${base}/v1/payment_intents/${intent}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
