import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBillingAlertsParams =
  paths['/v1/billing/alerts']['get']['parameters']['query'];

type GetBillingAlertsResponse =
  paths['/v1/billing/alerts']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_ALERTS = new InjectionToken<
  (
    params?: GetBillingAlertsParams,
  ) => ReturnType<typeof httpResource<GetBillingAlertsResponse>>
>('GET_BILLING_ALERTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetBillingAlertsParams) =>
      httpResource<GetBillingAlertsResponse>(() => ({
        url: `${base}/v1/billing/alerts`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
