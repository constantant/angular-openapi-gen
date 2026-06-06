import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostBillingPortalConfigurationsConfigurationBody = NonNullable<
  paths['/v1/billing_portal/configurations/{configuration}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostBillingPortalConfigurationsConfigurationResponse =
  paths['/v1/billing_portal/configurations/{configuration}']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_PORTAL_CONFIGURATIONS_CONFIGURATION =
  new InjectionToken<
    (
      configuration: string,
      body:
        | PostBillingPortalConfigurationsConfigurationBody
        | Signal<PostBillingPortalConfigurationsConfigurationBody>,
    ) => ReturnType<
      typeof httpResource<PostBillingPortalConfigurationsConfigurationResponse>
    >
  >('POST_BILLING_PORTAL_CONFIGURATIONS_CONFIGURATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        configuration: string,
        body:
          | PostBillingPortalConfigurationsConfigurationBody
          | Signal<PostBillingPortalConfigurationsConfigurationBody>,
      ) =>
        httpResource<PostBillingPortalConfigurationsConfigurationResponse>(
          () => ({
            url: `${base}/v1/billing_portal/configurations/${configuration}`,
            method: 'POST',
            body,
          }),
        );
    },
  });
