import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersIssuingCardsCardShippingFailBody = NonNullable<
  paths['/v1/test_helpers/issuing/cards/{card}/shipping/fail']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersIssuingCardsCardShippingFailResponse =
  paths['/v1/test_helpers/issuing/cards/{card}/shipping/fail']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_FAIL =
  new InjectionToken<
    (
      card: string,
      body:
        | PostTestHelpersIssuingCardsCardShippingFailBody
        | Signal<PostTestHelpersIssuingCardsCardShippingFailBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingCardsCardShippingFailResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_FAIL', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        card: string,
        body:
          | PostTestHelpersIssuingCardsCardShippingFailBody
          | Signal<PostTestHelpersIssuingCardsCardShippingFailBody>,
      ) =>
        httpResource<PostTestHelpersIssuingCardsCardShippingFailResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/cards/${card}/shipping/fail`,
            method: 'POST',
            body,
          }),
        );
    },
  });
