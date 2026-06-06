import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingPortalConfigurationsBody = NonNullable<
  paths['/v1/billing_portal/configurations']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingPortalConfigurationsResponse =
  paths['/v1/billing_portal/configurations']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_PORTAL_CONFIGURATIONS = new InjectionToken<
  (
    body:
      | PostBillingPortalConfigurationsBody
      | Signal<PostBillingPortalConfigurationsBody>,
  ) => ReturnType<typeof httpResource<PostBillingPortalConfigurationsResponse>>
>('POST_BILLING_PORTAL_CONFIGURATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostBillingPortalConfigurationsBody
        | Signal<PostBillingPortalConfigurationsBody>,
    ) =>
      httpResource<PostBillingPortalConfigurationsResponse>(() => ({
        url: `${base}/v1/billing_portal/configurations`,
        method: 'POST',
        body,
      }));
  },
});
