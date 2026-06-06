import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryReceivedDebitsParams =
  paths['/v1/treasury/received_debits']['get']['parameters']['query'];

export type GetTreasuryReceivedDebitsResponse =
  paths['/v1/treasury/received_debits']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_RECEIVED_DEBITS = new InjectionToken<
  (
    params?:
      | GetTreasuryReceivedDebitsParams
      | (() => GetTreasuryReceivedDebitsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryReceivedDebitsResponse>>
>('GET_TREASURY_RECEIVED_DEBITS');

export function provideGetTreasuryReceivedDebits(): FactoryProvider {
  return {
    provide: GET_TREASURY_RECEIVED_DEBITS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetTreasuryReceivedDebitsParams
          | (() => GetTreasuryReceivedDebitsParams | undefined),
      ) =>
        httpResource<GetTreasuryReceivedDebitsResponse>(() => ({
          url: `${base}/v1/treasury/received_debits`,
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
