import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryReceivedCreditsParams =
  paths['/v1/treasury/received_credits']['get']['parameters']['query'];

export type GetTreasuryReceivedCreditsResponse =
  paths['/v1/treasury/received_credits']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_RECEIVED_CREDITS = new InjectionToken<
  (
    params?:
      | GetTreasuryReceivedCreditsParams
      | (() => GetTreasuryReceivedCreditsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryReceivedCreditsResponse>>
>('GET_TREASURY_RECEIVED_CREDITS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetTreasuryReceivedCreditsParams
        | (() => GetTreasuryReceivedCreditsParams | undefined),
    ) =>
      httpResource<GetTreasuryReceivedCreditsResponse>(() => ({
        url: `${base}/v1/treasury/received_credits`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
