import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingPortalSessionsBody = NonNullable<
  paths['/v1/billing_portal/sessions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingPortalSessionsResponse =
  paths['/v1/billing_portal/sessions']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_PORTAL_SESSIONS = new InjectionToken<
  (
    body: PostBillingPortalSessionsBody | Signal<PostBillingPortalSessionsBody>,
  ) => ReturnType<typeof httpResource<PostBillingPortalSessionsResponse>>
>('POST_BILLING_PORTAL_SESSIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostBillingPortalSessionsBody
        | Signal<PostBillingPortalSessionsBody>,
    ) =>
      httpResource<PostBillingPortalSessionsResponse>(() => ({
        url: `${base}/v1/billing_portal/sessions`,
        method: 'POST',
        body,
      }));
  },
});
