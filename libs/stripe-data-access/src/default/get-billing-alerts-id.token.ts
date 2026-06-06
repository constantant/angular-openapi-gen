import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBillingAlertsIdParams =
  paths['/v1/billing/alerts/{id}']['get']['parameters']['query'];

export type GetBillingAlertsIdResponse =
  paths['/v1/billing/alerts/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_ALERTS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetBillingAlertsIdParams
      | (() => GetBillingAlertsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetBillingAlertsIdResponse>>
>('GET_BILLING_ALERTS_ID');

export function provideGetBillingAlertsId(): FactoryProvider {
  return {
    provide: GET_BILLING_ALERTS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetBillingAlertsIdParams
          | (() => GetBillingAlertsIdParams | undefined),
      ) =>
        httpResource<GetBillingAlertsIdResponse>(() => ({
          url: `${base}/v1/billing/alerts/${id}`,
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
