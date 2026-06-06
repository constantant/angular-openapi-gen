import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTerminalReadersReaderPresentPaymentMethodBody =
  NonNullable<
    paths['/v1/test_helpers/terminal/readers/{reader}/present_payment_method']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTerminalReadersReaderPresentPaymentMethodResponse =
  paths['/v1/test_helpers/terminal/readers/{reader}/present_payment_method']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TERMINAL_READERS_READER_PRESENT_PAYMENT_METHOD =
  new InjectionToken<
    (
      reader: string,
      body:
        | PostTestHelpersTerminalReadersReaderPresentPaymentMethodBody
        | Signal<PostTestHelpersTerminalReadersReaderPresentPaymentMethodBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTerminalReadersReaderPresentPaymentMethodResponse>
    >
  >('POST_TEST_HELPERS_TERMINAL_READERS_READER_PRESENT_PAYMENT_METHOD');

export function providePostTestHelpersTerminalReadersReaderPresentPaymentMethod(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_TERMINAL_READERS_READER_PRESENT_PAYMENT_METHOD,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reader: string,
        body:
          | PostTestHelpersTerminalReadersReaderPresentPaymentMethodBody
          | Signal<PostTestHelpersTerminalReadersReaderPresentPaymentMethodBody>,
      ) =>
        httpResource<PostTestHelpersTerminalReadersReaderPresentPaymentMethodResponse>(
          () => ({
            url: `${base}/v1/test_helpers/terminal/readers/${reader}/present_payment_method`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
