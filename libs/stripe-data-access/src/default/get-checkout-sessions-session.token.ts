import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCheckoutSessionsSessionParams =
  paths['/v1/checkout/sessions/{session}']['get']['parameters']['query'];

export type GetCheckoutSessionsSessionResponse =
  paths['/v1/checkout/sessions/{session}']['get']['responses']['200']['content']['application/json'];

export const GET_CHECKOUT_SESSIONS_SESSION = new InjectionToken<
  (
    session: string,
    params?:
      | GetCheckoutSessionsSessionParams
      | (() => GetCheckoutSessionsSessionParams | undefined),
  ) => ReturnType<typeof httpResource<GetCheckoutSessionsSessionResponse>>
>('GET_CHECKOUT_SESSIONS_SESSION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      session: string,
      params?:
        | GetCheckoutSessionsSessionParams
        | (() => GetCheckoutSessionsSessionParams | undefined),
    ) =>
      httpResource<GetCheckoutSessionsSessionResponse>(() => ({
        url: `${base}/v1/checkout/sessions/${session}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
