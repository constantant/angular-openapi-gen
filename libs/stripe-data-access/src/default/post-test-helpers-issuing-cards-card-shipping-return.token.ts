import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingCardsCardShippingReturnBody = NonNullable<
  paths['/v1/test_helpers/issuing/cards/{card}/shipping/return']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingCardsCardShippingReturnResponse =
  paths['/v1/test_helpers/issuing/cards/{card}/shipping/return']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_RETURN =
  new InjectionToken<
    (
      card: string,
      body:
        | PostTestHelpersIssuingCardsCardShippingReturnBody
        | Signal<PostTestHelpersIssuingCardsCardShippingReturnBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingCardsCardShippingReturnResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_CARDS_CARD_SHIPPING_RETURN', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        card: string,
        body:
          | PostTestHelpersIssuingCardsCardShippingReturnBody
          | Signal<PostTestHelpersIssuingCardsCardShippingReturnBody>,
      ) =>
        httpResource<PostTestHelpersIssuingCardsCardShippingReturnResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/cards/${card}/shipping/return`,
            method: 'POST',
            body,
          }),
        );
    },
  });
