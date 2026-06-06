import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTransfersIdReversalsParams =
  paths['/v1/transfers/{id}/reversals']['get']['parameters']['query'];

export type GetTransfersIdReversalsResponse =
  paths['/v1/transfers/{id}/reversals']['get']['responses']['200']['content']['application/json'];

export const GET_TRANSFERS_ID_REVERSALS = new InjectionToken<
  (
    id: string,
    params?:
      | GetTransfersIdReversalsParams
      | (() => GetTransfersIdReversalsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTransfersIdReversalsResponse>>
>('GET_TRANSFERS_ID_REVERSALS');

export function provideGetTransfersIdReversals(): FactoryProvider {
  return {
    provide: GET_TRANSFERS_ID_REVERSALS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetTransfersIdReversalsParams
          | (() => GetTransfersIdReversalsParams | undefined),
      ) =>
        httpResource<GetTransfersIdReversalsResponse>(() => ({
          url: `${base}/v1/transfers/${id}/reversals`,
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
