import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCheckoutSessionsSessionLineItemsParams =
  paths['/v1/checkout/sessions/{session}/line_items']['get']['parameters']['query'];

export type GetCheckoutSessionsSessionLineItemsResponse =
  paths['/v1/checkout/sessions/{session}/line_items']['get']['responses']['200']['content']['application/json'];

export const GET_CHECKOUT_SESSIONS_SESSION_LINE_ITEMS = new InjectionToken<
  (
    session: string,
    params?:
      | GetCheckoutSessionsSessionLineItemsParams
      | (() => GetCheckoutSessionsSessionLineItemsParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetCheckoutSessionsSessionLineItemsResponse>
  >
>('GET_CHECKOUT_SESSIONS_SESSION_LINE_ITEMS');

export function provideGetCheckoutSessionsSessionLineItems(): FactoryProvider {
  return {
    provide: GET_CHECKOUT_SESSIONS_SESSION_LINE_ITEMS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        session: string,
        params?:
          | GetCheckoutSessionsSessionLineItemsParams
          | (() => GetCheckoutSessionsSessionLineItemsParams | undefined),
      ) =>
        httpResource<GetCheckoutSessionsSessionLineItemsResponse>(() => ({
          url: `${base}/v1/checkout/sessions/${session}/line_items`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
