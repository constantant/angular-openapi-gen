import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalReadersReaderProcessPaymentIntentBody = NonNullable<
  paths['/v1/terminal/readers/{reader}/process_payment_intent']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalReadersReaderProcessPaymentIntentResponse =
  paths['/v1/terminal/readers/{reader}/process_payment_intent']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_READERS_READER_PROCESS_PAYMENT_INTENT =
  new InjectionToken<
    (
      reader: string,
      body:
        | PostTerminalReadersReaderProcessPaymentIntentBody
        | Signal<PostTerminalReadersReaderProcessPaymentIntentBody>,
    ) => ReturnType<
      typeof httpResource<PostTerminalReadersReaderProcessPaymentIntentResponse>
    >
  >('POST_TERMINAL_READERS_READER_PROCESS_PAYMENT_INTENT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reader: string,
        body:
          | PostTerminalReadersReaderProcessPaymentIntentBody
          | Signal<PostTerminalReadersReaderProcessPaymentIntentBody>,
      ) =>
        httpResource<PostTerminalReadersReaderProcessPaymentIntentResponse>(
          () => ({
            url: `${base}/v1/terminal/readers/${reader}/process_payment_intent`,
            method: 'POST',
            body,
          }),
        );
    },
  });
