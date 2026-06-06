import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentIntentsBody = NonNullable<
  paths['/v1/payment_intents']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentIntentsResponse =
  paths['/v1/payment_intents']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_INTENTS = new InjectionToken<
  (
    body: PostPaymentIntentsBody | Signal<PostPaymentIntentsBody>,
  ) => ReturnType<typeof httpResource<PostPaymentIntentsResponse>>
>('POST_PAYMENT_INTENTS');

export function providePostPaymentIntents(): FactoryProvider {
  return {
    provide: POST_PAYMENT_INTENTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostPaymentIntentsBody | Signal<PostPaymentIntentsBody>) =>
        httpResource<PostPaymentIntentsResponse>(() => ({
          url: `${base}/v1/payment_intents`,
          method: 'POST',
          body,
        }));
    },
  };
}
