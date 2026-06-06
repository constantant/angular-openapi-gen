import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetDisputesDisputeParams =
  paths['/v1/disputes/{dispute}']['get']['parameters']['query'];

export type GetDisputesDisputeResponse =
  paths['/v1/disputes/{dispute}']['get']['responses']['200']['content']['application/json'];

export const GET_DISPUTES_DISPUTE = new InjectionToken<
  (
    dispute: string,
    params?:
      | GetDisputesDisputeParams
      | (() => GetDisputesDisputeParams | undefined),
  ) => ReturnType<typeof httpResource<GetDisputesDisputeResponse>>
>('GET_DISPUTES_DISPUTE');

export function provideGetDisputesDispute(): FactoryProvider {
  return {
    provide: GET_DISPUTES_DISPUTE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        dispute: string,
        params?:
          | GetDisputesDisputeParams
          | (() => GetDisputesDisputeParams | undefined),
      ) =>
        httpResource<GetDisputesDisputeResponse>(() => ({
          url: `${base}/v1/disputes/${dispute}`,
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
