import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryDebitReversalsDebitReversalParams =
  paths['/v1/treasury/debit_reversals/{debit_reversal}']['get']['parameters']['query'];

export type GetTreasuryDebitReversalsDebitReversalResponse =
  paths['/v1/treasury/debit_reversals/{debit_reversal}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_DEBIT_REVERSALS_DEBIT_REVERSAL = new InjectionToken<
  (
    debitReversal: string,
    params?:
      | GetTreasuryDebitReversalsDebitReversalParams
      | (() => GetTreasuryDebitReversalsDebitReversalParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetTreasuryDebitReversalsDebitReversalResponse>
  >
>('GET_TREASURY_DEBIT_REVERSALS_DEBIT_REVERSAL', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      debitReversal: string,
      params?:
        | GetTreasuryDebitReversalsDebitReversalParams
        | (() => GetTreasuryDebitReversalsDebitReversalParams | undefined),
    ) =>
      httpResource<GetTreasuryDebitReversalsDebitReversalResponse>(() => ({
        url: `${base}/v1/treasury/debit_reversals/${debitReversal}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
