import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalReadersReaderRefundPaymentBody = NonNullable<
  paths['/v1/terminal/readers/{reader}/refund_payment']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalReadersReaderRefundPaymentResponse =
  paths['/v1/terminal/readers/{reader}/refund_payment']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_READERS_READER_REFUND_PAYMENT = new InjectionToken<
  (
    reader: string,
    body:
      | PostTerminalReadersReaderRefundPaymentBody
      | Signal<PostTerminalReadersReaderRefundPaymentBody>,
  ) => ReturnType<
    typeof httpResource<PostTerminalReadersReaderRefundPaymentResponse>
  >
>('POST_TERMINAL_READERS_READER_REFUND_PAYMENT');

export function providePostTerminalReadersReaderRefundPayment(): FactoryProvider {
  return {
    provide: POST_TERMINAL_READERS_READER_REFUND_PAYMENT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reader: string,
        body:
          | PostTerminalReadersReaderRefundPaymentBody
          | Signal<PostTerminalReadersReaderRefundPaymentBody>,
      ) =>
        httpResource<PostTerminalReadersReaderRefundPaymentResponse>(() => ({
          url: `${base}/v1/terminal/readers/${reader}/refund_payment`,
          method: 'POST',
          body,
        }));
    },
  };
}
