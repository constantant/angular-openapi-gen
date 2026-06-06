import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCheckoutSessionsParams =
  paths['/v1/checkout/sessions']['get']['parameters']['query'];

export type GetCheckoutSessionsResponse =
  paths['/v1/checkout/sessions']['get']['responses']['200']['content']['application/json'];

export const GET_CHECKOUT_SESSIONS = new InjectionToken<
  (
    params?:
      | GetCheckoutSessionsParams
      | (() => GetCheckoutSessionsParams | undefined),
  ) => ReturnType<typeof httpResource<GetCheckoutSessionsResponse>>
>('GET_CHECKOUT_SESSIONS');

export function provideGetCheckoutSessions(): FactoryProvider {
  return {
    provide: GET_CHECKOUT_SESSIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetCheckoutSessionsParams
          | (() => GetCheckoutSessionsParams | undefined),
      ) =>
        httpResource<GetCheckoutSessionsResponse>(() => ({
          url: `${base}/v1/checkout/sessions`,
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
