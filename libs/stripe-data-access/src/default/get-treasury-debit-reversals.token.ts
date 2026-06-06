import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryDebitReversalsParams =
  paths['/v1/treasury/debit_reversals']['get']['parameters']['query'];

export type GetTreasuryDebitReversalsResponse =
  paths['/v1/treasury/debit_reversals']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_DEBIT_REVERSALS = new InjectionToken<
  (
    params?:
      | GetTreasuryDebitReversalsParams
      | (() => GetTreasuryDebitReversalsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryDebitReversalsResponse>>
>('GET_TREASURY_DEBIT_REVERSALS');

export function provideGetTreasuryDebitReversals(): FactoryProvider {
  return {
    provide: GET_TREASURY_DEBIT_REVERSALS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetTreasuryDebitReversalsParams
          | (() => GetTreasuryDebitReversalsParams | undefined),
      ) =>
        httpResource<GetTreasuryDebitReversalsResponse>(() => ({
          url: `${base}/v1/treasury/debit_reversals`,
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
