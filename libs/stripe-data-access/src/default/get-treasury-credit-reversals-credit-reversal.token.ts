import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryCreditReversalsCreditReversalParams =
  paths['/v1/treasury/credit_reversals/{credit_reversal}']['get']['parameters']['query'];

export type GetTreasuryCreditReversalsCreditReversalResponse =
  paths['/v1/treasury/credit_reversals/{credit_reversal}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_CREDIT_REVERSALS_CREDIT_REVERSAL = new InjectionToken<
  (
    creditReversal: string,
    params?:
      | GetTreasuryCreditReversalsCreditReversalParams
      | (() => GetTreasuryCreditReversalsCreditReversalParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetTreasuryCreditReversalsCreditReversalResponse>
  >
>('GET_TREASURY_CREDIT_REVERSALS_CREDIT_REVERSAL', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      creditReversal: string,
      params?:
        | GetTreasuryCreditReversalsCreditReversalParams
        | (() => GetTreasuryCreditReversalsCreditReversalParams | undefined),
    ) =>
      httpResource<GetTreasuryCreditReversalsCreditReversalResponse>(() => ({
        url: `${base}/v1/treasury/credit_reversals/${creditReversal}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
