import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersIssuingCardsCardShippingDeliverBody = NonNullable<
  paths['/v1/test_helpers/issuing/cards/{card}/shipping/deliver']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersIssuingCardsCardShippingDeliverResponse =
  paths['/v1/test_helpers/issuing/cards/{card}/shipping/deliver']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_DELIVER =
  new InjectionToken<
    (
      card: string,
      body:
        | PostTestHelpersIssuingCardsCardShippingDeliverBody
        | Signal<PostTestHelpersIssuingCardsCardShippingDeliverBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingCardsCardShippingDeliverResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_DELIVER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        card: string,
        body:
          | PostTestHelpersIssuingCardsCardShippingDeliverBody
          | Signal<PostTestHelpersIssuingCardsCardShippingDeliverBody>,
      ) =>
        httpResource<PostTestHelpersIssuingCardsCardShippingDeliverResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/cards/${card}/shipping/deliver`,
            method: 'POST',
            body,
          }),
        );
    },
  });
