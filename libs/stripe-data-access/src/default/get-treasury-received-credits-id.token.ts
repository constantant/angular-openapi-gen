import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryReceivedCreditsIdParams =
  paths['/v1/treasury/received_credits/{id}']['get']['parameters']['query'];

export type GetTreasuryReceivedCreditsIdResponse =
  paths['/v1/treasury/received_credits/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_RECEIVED_CREDITS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetTreasuryReceivedCreditsIdParams
      | (() => GetTreasuryReceivedCreditsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryReceivedCreditsIdResponse>>
>('GET_TREASURY_RECEIVED_CREDITS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      params?:
        | GetTreasuryReceivedCreditsIdParams
        | (() => GetTreasuryReceivedCreditsIdParams | undefined),
    ) =>
      httpResource<GetTreasuryReceivedCreditsIdResponse>(() => ({
        url: `${base}/v1/treasury/received_credits/${id}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
