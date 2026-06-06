import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBillingAlertsParams =
  paths['/v1/billing/alerts']['get']['parameters']['query'];

export type GetBillingAlertsResponse =
  paths['/v1/billing/alerts']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_ALERTS = new InjectionToken<
  (
    params?:
      | GetBillingAlertsParams
      | (() => GetBillingAlertsParams | undefined),
  ) => ReturnType<typeof httpResource<GetBillingAlertsResponse>>
>('GET_BILLING_ALERTS');

export function provideGetBillingAlerts(): FactoryProvider {
  return {
    provide: GET_BILLING_ALERTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetBillingAlertsParams
          | (() => GetBillingAlertsParams | undefined),
      ) =>
        httpResource<GetBillingAlertsResponse>(() => ({
          url: `${base}/v1/billing/alerts`,
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
