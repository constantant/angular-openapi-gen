import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryCreditReversalsParams =
  paths['/v1/treasury/credit_reversals']['get']['parameters']['query'];

export type GetTreasuryCreditReversalsResponse =
  paths['/v1/treasury/credit_reversals']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_CREDIT_REVERSALS = new InjectionToken<
  (
    params?:
      | GetTreasuryCreditReversalsParams
      | (() => GetTreasuryCreditReversalsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryCreditReversalsResponse>>
>('GET_TREASURY_CREDIT_REVERSALS');

export function provideGetTreasuryCreditReversals(): FactoryProvider {
  return {
    provide: GET_TREASURY_CREDIT_REVERSALS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetTreasuryCreditReversalsParams
          | (() => GetTreasuryCreditReversalsParams | undefined),
      ) =>
        httpResource<GetTreasuryCreditReversalsResponse>(() => ({
          url: `${base}/v1/treasury/credit_reversals`,
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
