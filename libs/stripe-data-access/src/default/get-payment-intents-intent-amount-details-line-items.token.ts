import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentIntentsIntentAmountDetailsLineItemsParams =
  paths['/v1/payment_intents/{intent}/amount_details_line_items']['get']['parameters']['query'];

type GetPaymentIntentsIntentAmountDetailsLineItemsResponse =
  paths['/v1/payment_intents/{intent}/amount_details_line_items']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_INTENTS_INTENT_AMOUNT_DETAILS_LINE_ITEMS =
  new InjectionToken<
    (
      intent: string,
      params?: GetPaymentIntentsIntentAmountDetailsLineItemsParams,
    ) => ReturnType<
      typeof httpResource<GetPaymentIntentsIntentAmountDetailsLineItemsResponse>
    >
  >('GET_PAYMENT_INTENTS_INTENT_AMOUNT_DETAILS_LINE_ITEMS', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        intent: string,
        params?: GetPaymentIntentsIntentAmountDetailsLineItemsParams,
      ) =>
        httpResource<GetPaymentIntentsIntentAmountDetailsLineItemsResponse>(
          () => ({
            url: `${base}/v1/payment_intents/${intent}/amount_details_line_items`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
