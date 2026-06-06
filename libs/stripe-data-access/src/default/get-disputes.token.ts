import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetDisputesParams =
  paths['/v1/disputes']['get']['parameters']['query'];

export type GetDisputesResponse =
  paths['/v1/disputes']['get']['responses']['200']['content']['application/json'];

export const GET_DISPUTES = new InjectionToken<
  (
    params?: GetDisputesParams | (() => GetDisputesParams | undefined),
  ) => ReturnType<typeof httpResource<GetDisputesResponse>>
>('GET_DISPUTES');

export function provideGetDisputes(): FactoryProvider {
  return {
    provide: GET_DISPUTES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?: GetDisputesParams | (() => GetDisputesParams | undefined),
      ) =>
        httpResource<GetDisputesResponse>(() => ({
          url: `${base}/v1/disputes`,
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
