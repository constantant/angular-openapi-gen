import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingAlertsIdActivateBody = NonNullable<
  paths['/v1/billing/alerts/{id}/activate']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingAlertsIdActivateResponse =
  paths['/v1/billing/alerts/{id}/activate']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_ALERTS_ID_ACTIVATE = new InjectionToken<
  (
    id: string,
    body:
      | PostBillingAlertsIdActivateBody
      | Signal<PostBillingAlertsIdActivateBody>,
  ) => ReturnType<typeof httpResource<PostBillingAlertsIdActivateResponse>>
>('POST_BILLING_ALERTS_ID_ACTIVATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body:
        | PostBillingAlertsIdActivateBody
        | Signal<PostBillingAlertsIdActivateBody>,
    ) =>
      httpResource<PostBillingAlertsIdActivateResponse>(() => ({
        url: `${base}/v1/billing/alerts/${id}/activate`,
        method: 'POST',
        body,
      }));
  },
});
