import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryReceivedDebitsIdParams =
  paths['/v1/treasury/received_debits/{id}']['get']['parameters']['query'];

export type GetTreasuryReceivedDebitsIdResponse =
  paths['/v1/treasury/received_debits/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_RECEIVED_DEBITS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetTreasuryReceivedDebitsIdParams
      | (() => GetTreasuryReceivedDebitsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryReceivedDebitsIdResponse>>
>('GET_TREASURY_RECEIVED_DEBITS_ID');

export function provideGetTreasuryReceivedDebitsId(): FactoryProvider {
  return {
    provide: GET_TREASURY_RECEIVED_DEBITS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetTreasuryReceivedDebitsIdParams
          | (() => GetTreasuryReceivedDebitsIdParams | undefined),
      ) =>
        httpResource<GetTreasuryReceivedDebitsIdResponse>(() => ({
          url: `${base}/v1/treasury/received_debits/${id}`,
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
