import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBillingMetersParams =
  paths['/v1/billing/meters']['get']['parameters']['query'];

export type GetBillingMetersResponse =
  paths['/v1/billing/meters']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_METERS = new InjectionToken<
  (
    params?:
      | GetBillingMetersParams
      | (() => GetBillingMetersParams | undefined),
  ) => ReturnType<typeof httpResource<GetBillingMetersResponse>>
>('GET_BILLING_METERS');

export function provideGetBillingMeters(): FactoryProvider {
  return {
    provide: GET_BILLING_METERS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetBillingMetersParams
          | (() => GetBillingMetersParams | undefined),
      ) =>
        httpResource<GetBillingMetersResponse>(() => ({
          url: `${base}/v1/billing/meters`,
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
