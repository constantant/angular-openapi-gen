import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentIntentsIntentParams =
  paths['/v1/payment_intents/{intent}']['get']['parameters']['query'];

export type GetPaymentIntentsIntentResponse =
  paths['/v1/payment_intents/{intent}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_INTENTS_INTENT = new InjectionToken<
  (
    intent: string,
    params?:
      | GetPaymentIntentsIntentParams
      | (() => GetPaymentIntentsIntentParams | undefined),
  ) => ReturnType<typeof httpResource<GetPaymentIntentsIntentResponse>>
>('GET_PAYMENT_INTENTS_INTENT');

export function provideGetPaymentIntentsIntent(): FactoryProvider {
  return {
    provide: GET_PAYMENT_INTENTS_INTENT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        intent: string,
        params?:
          | GetPaymentIntentsIntentParams
          | (() => GetPaymentIntentsIntentParams | undefined),
      ) =>
        httpResource<GetPaymentIntentsIntentResponse>(() => ({
          url: `${base}/v1/payment_intents/${intent}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
