import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTreasuryDebitReversalsDebitReversalParams =
  paths['/v1/treasury/debit_reversals/{debit_reversal}']['get']['parameters']['query'];

type GetTreasuryDebitReversalsDebitReversalResponse =
  paths['/v1/treasury/debit_reversals/{debit_reversal}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_DEBIT_REVERSALS_DEBIT_REVERSAL = new InjectionToken<
  (
    debit_reversal: string,
    params?: GetTreasuryDebitReversalsDebitReversalParams,
  ) => ReturnType<
    typeof httpResource<GetTreasuryDebitReversalsDebitReversalResponse>
  >
>('GET_TREASURY_DEBIT_REVERSALS_DEBIT_REVERSAL', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      debit_reversal: string,
      params?: GetTreasuryDebitReversalsDebitReversalParams,
    ) =>
      httpResource<GetTreasuryDebitReversalsDebitReversalResponse>(() => ({
        url: `${base}/v1/treasury/debit_reversals/${debit_reversal}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
