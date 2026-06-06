import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostBillingAlertsIdDeactivateBody = NonNullable<
  paths['/v1/billing/alerts/{id}/deactivate']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostBillingAlertsIdDeactivateResponse =
  paths['/v1/billing/alerts/{id}/deactivate']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_ALERTS_ID_DEACTIVATE = new InjectionToken<
  (
    id: string,
    body:
      | PostBillingAlertsIdDeactivateBody
      | Signal<PostBillingAlertsIdDeactivateBody>,
  ) => ReturnType<typeof httpResource<PostBillingAlertsIdDeactivateResponse>>
>('POST_BILLING_ALERTS_ID_DEACTIVATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body:
        | PostBillingAlertsIdDeactivateBody
        | Signal<PostBillingAlertsIdDeactivateBody>,
    ) =>
      httpResource<PostBillingAlertsIdDeactivateResponse>(() => ({
        url: `${base}/v1/billing/alerts/${id}/deactivate`,
        method: 'POST',
        body,
      }));
  },
});
