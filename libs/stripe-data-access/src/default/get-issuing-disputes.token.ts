import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingDisputesParams =
  paths['/v1/issuing/disputes']['get']['parameters']['query'];

export type GetIssuingDisputesResponse =
  paths['/v1/issuing/disputes']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_DISPUTES = new InjectionToken<
  (
    params?:
      | GetIssuingDisputesParams
      | (() => GetIssuingDisputesParams | undefined),
  ) => ReturnType<typeof httpResource<GetIssuingDisputesResponse>>
>('GET_ISSUING_DISPUTES');

export function provideGetIssuingDisputes(): FactoryProvider {
  return {
    provide: GET_ISSUING_DISPUTES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetIssuingDisputesParams
          | (() => GetIssuingDisputesParams | undefined),
      ) =>
        httpResource<GetIssuingDisputesResponse>(() => ({
          url: `${base}/v1/issuing/disputes`,
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
