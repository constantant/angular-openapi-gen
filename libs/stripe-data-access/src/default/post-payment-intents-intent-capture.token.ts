import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentIntentsIntentCaptureBody = NonNullable<
  paths['/v1/payment_intents/{intent}/capture']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentIntentsIntentCaptureResponse =
  paths['/v1/payment_intents/{intent}/capture']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_INTENTS_INTENT_CAPTURE = new InjectionToken<
  (
    intent: string,
    body:
      | PostPaymentIntentsIntentCaptureBody
      | Signal<PostPaymentIntentsIntentCaptureBody>,
  ) => ReturnType<typeof httpResource<PostPaymentIntentsIntentCaptureResponse>>
>('POST_PAYMENT_INTENTS_INTENT_CAPTURE');

export function providePostPaymentIntentsIntentCapture(): FactoryProvider {
  return {
    provide: POST_PAYMENT_INTENTS_INTENT_CAPTURE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        intent: string,
        body:
          | PostPaymentIntentsIntentCaptureBody
          | Signal<PostPaymentIntentsIntentCaptureBody>,
      ) =>
        httpResource<PostPaymentIntentsIntentCaptureResponse>(() => ({
          url: `${base}/v1/payment_intents/${intent}/capture`,
          method: 'POST',
          body,
        }));
    },
  };
}
