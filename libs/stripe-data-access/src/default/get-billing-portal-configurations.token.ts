import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBillingPortalConfigurationsParams =
  paths['/v1/billing_portal/configurations']['get']['parameters']['query'];

type GetBillingPortalConfigurationsResponse =
  paths['/v1/billing_portal/configurations']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_PORTAL_CONFIGURATIONS = new InjectionToken<
  (
    params?: GetBillingPortalConfigurationsParams,
  ) => ReturnType<typeof httpResource<GetBillingPortalConfigurationsResponse>>
>('GET_BILLING_PORTAL_CONFIGURATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetBillingPortalConfigurationsParams) =>
      httpResource<GetBillingPortalConfigurationsResponse>(() => ({
        url: `${base}/v1/billing_portal/configurations`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
