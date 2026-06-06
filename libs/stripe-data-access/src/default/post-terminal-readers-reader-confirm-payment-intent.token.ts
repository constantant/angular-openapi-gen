import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalReadersReaderConfirmPaymentIntentBody = NonNullable<
  paths['/v1/terminal/readers/{reader}/confirm_payment_intent']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalReadersReaderConfirmPaymentIntentResponse =
  paths['/v1/terminal/readers/{reader}/confirm_payment_intent']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_READERS_READER_CONFIRM_PAYMENT_INTENT =
  new InjectionToken<
    (
      reader: string,
      body:
        | PostTerminalReadersReaderConfirmPaymentIntentBody
        | Signal<PostTerminalReadersReaderConfirmPaymentIntentBody>,
    ) => ReturnType<
      typeof httpResource<PostTerminalReadersReaderConfirmPaymentIntentResponse>
    >
  >('POST_TERMINAL_READERS_READER_CONFIRM_PAYMENT_INTENT');

export function providePostTerminalReadersReaderConfirmPaymentIntent(): FactoryProvider {
  return {
    provide: POST_TERMINAL_READERS_READER_CONFIRM_PAYMENT_INTENT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reader: string,
        body:
          | PostTerminalReadersReaderConfirmPaymentIntentBody
          | Signal<PostTerminalReadersReaderConfirmPaymentIntentBody>,
      ) =>
        httpResource<PostTerminalReadersReaderConfirmPaymentIntentResponse>(
          () => ({
            url: `${base}/v1/terminal/readers/${reader}/confirm_payment_intent`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
