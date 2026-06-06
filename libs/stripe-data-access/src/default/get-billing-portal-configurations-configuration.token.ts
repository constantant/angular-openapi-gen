import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBillingPortalConfigurationsConfigurationParams =
  paths['/v1/billing_portal/configurations/{configuration}']['get']['parameters']['query'];

export type GetBillingPortalConfigurationsConfigurationResponse =
  paths['/v1/billing_portal/configurations/{configuration}']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_PORTAL_CONFIGURATIONS_CONFIGURATION =
  new InjectionToken<
    (
      configuration: string,
      params?:
        | GetBillingPortalConfigurationsConfigurationParams
        | (() => GetBillingPortalConfigurationsConfigurationParams | undefined),
    ) => ReturnType<
      typeof httpResource<GetBillingPortalConfigurationsConfigurationResponse>
    >
  >('GET_BILLING_PORTAL_CONFIGURATIONS_CONFIGURATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        configuration: string,
        params?:
          | GetBillingPortalConfigurationsConfigurationParams
          | (() =>
              | GetBillingPortalConfigurationsConfigurationParams
              | undefined),
      ) =>
        httpResource<GetBillingPortalConfigurationsConfigurationResponse>(
          () => ({
            url: `${base}/v1/billing_portal/configurations/${configuration}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
