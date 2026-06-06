import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostBillingAlertsIdArchiveBody = NonNullable<
  paths['/v1/billing/alerts/{id}/archive']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostBillingAlertsIdArchiveResponse =
  paths['/v1/billing/alerts/{id}/archive']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_ALERTS_ID_ARCHIVE = new InjectionToken<
  (
    id: string,
    body:
      | PostBillingAlertsIdArchiveBody
      | Signal<PostBillingAlertsIdArchiveBody>,
  ) => ReturnType<typeof httpResource<PostBillingAlertsIdArchiveResponse>>
>('POST_BILLING_ALERTS_ID_ARCHIVE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body:
        | PostBillingAlertsIdArchiveBody
        | Signal<PostBillingAlertsIdArchiveBody>,
    ) =>
      httpResource<PostBillingAlertsIdArchiveResponse>(() => ({
        url: `${base}/v1/billing/alerts/${id}/archive`,
        method: 'POST',
        body,
      }));
  },
});
