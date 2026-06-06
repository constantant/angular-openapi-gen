import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalReadersReaderCollectPaymentMethodBody = NonNullable<
  paths['/v1/terminal/readers/{reader}/collect_payment_method']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalReadersReaderCollectPaymentMethodResponse =
  paths['/v1/terminal/readers/{reader}/collect_payment_method']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_READERS_READER_COLLECT_PAYMENT_METHOD =
  new InjectionToken<
    (
      reader: string,
      body:
        | PostTerminalReadersReaderCollectPaymentMethodBody
        | Signal<PostTerminalReadersReaderCollectPaymentMethodBody>,
    ) => ReturnType<
      typeof httpResource<PostTerminalReadersReaderCollectPaymentMethodResponse>
    >
  >('POST_TERMINAL_READERS_READER_COLLECT_PAYMENT_METHOD');

export function providePostTerminalReadersReaderCollectPaymentMethod(): FactoryProvider {
  return {
    provide: POST_TERMINAL_READERS_READER_COLLECT_PAYMENT_METHOD,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reader: string,
        body:
          | PostTerminalReadersReaderCollectPaymentMethodBody
          | Signal<PostTerminalReadersReaderCollectPaymentMethodBody>,
      ) =>
        httpResource<PostTerminalReadersReaderCollectPaymentMethodResponse>(
          () => ({
            url: `${base}/v1/terminal/readers/${reader}/collect_payment_method`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
