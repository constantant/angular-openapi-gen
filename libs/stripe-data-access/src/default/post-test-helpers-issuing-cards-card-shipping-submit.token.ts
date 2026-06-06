import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingCardsCardShippingSubmitBody = NonNullable<
  paths['/v1/test_helpers/issuing/cards/{card}/shipping/submit']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingCardsCardShippingSubmitResponse =
  paths['/v1/test_helpers/issuing/cards/{card}/shipping/submit']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_SUBMIT =
  new InjectionToken<
    (
      card: string,
      body:
        | PostTestHelpersIssuingCardsCardShippingSubmitBody
        | Signal<PostTestHelpersIssuingCardsCardShippingSubmitBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingCardsCardShippingSubmitResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_SUBMIT');

export function providePostTestHelpersIssuingCardsCardShippingSubmit(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_SUBMIT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        card: string,
        body:
          | PostTestHelpersIssuingCardsCardShippingSubmitBody
          | Signal<PostTestHelpersIssuingCardsCardShippingSubmitBody>,
      ) =>
        httpResource<PostTestHelpersIssuingCardsCardShippingSubmitResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/cards/${card}/shipping/submit`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
