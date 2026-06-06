import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBillingPortalConfigurationsParams =
  paths['/v1/billing_portal/configurations']['get']['parameters']['query'];

export type GetBillingPortalConfigurationsResponse =
  paths['/v1/billing_portal/configurations']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_PORTAL_CONFIGURATIONS = new InjectionToken<
  (
    params?:
      | GetBillingPortalConfigurationsParams
      | (() => GetBillingPortalConfigurationsParams | undefined),
  ) => ReturnType<typeof httpResource<GetBillingPortalConfigurationsResponse>>
>('GET_BILLING_PORTAL_CONFIGURATIONS');

export function provideGetBillingPortalConfigurations(): FactoryProvider {
  return {
    provide: GET_BILLING_PORTAL_CONFIGURATIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetBillingPortalConfigurationsParams
          | (() => GetBillingPortalConfigurationsParams | undefined),
      ) =>
        httpResource<GetBillingPortalConfigurationsResponse>(() => ({
          url: `${base}/v1/billing_portal/configurations`,
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
