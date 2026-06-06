import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingCardsCardShippingShipBody = NonNullable<
  paths['/v1/test_helpers/issuing/cards/{card}/shipping/ship']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingCardsCardShippingShipResponse =
  paths['/v1/test_helpers/issuing/cards/{card}/shipping/ship']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_SHIP =
  new InjectionToken<
    (
      card: string,
      body:
        | PostTestHelpersIssuingCardsCardShippingShipBody
        | Signal<PostTestHelpersIssuingCardsCardShippingShipBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingCardsCardShippingShipResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_SHIP');

export function providePostTestHelpersIssuingCardsCardShippingShip(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_SHIP,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        card: string,
        body:
          | PostTestHelpersIssuingCardsCardShippingShipBody
          | Signal<PostTestHelpersIssuingCardsCardShippingShipBody>,
      ) =>
        httpResource<PostTestHelpersIssuingCardsCardShippingShipResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/cards/${card}/shipping/ship`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
