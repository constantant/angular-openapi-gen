import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCheckoutSessionsParams =
  paths['/v1/checkout/sessions']['get']['parameters']['query'];

type GetCheckoutSessionsResponse =
  paths['/v1/checkout/sessions']['get']['responses']['200']['content']['application/json'];

export const GET_CHECKOUT_SESSIONS = new InjectionToken<
  (
    params?: GetCheckoutSessionsParams,
  ) => ReturnType<typeof httpResource<GetCheckoutSessionsResponse>>
>('GET_CHECKOUT_SESSIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetCheckoutSessionsParams) =>
      httpResource<GetCheckoutSessionsResponse>(() => ({
        url: `${base}/v1/checkout/sessions`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
