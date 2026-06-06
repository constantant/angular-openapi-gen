import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingMeterEventsBody = NonNullable<
  paths['/v1/billing/meter_events']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingMeterEventsResponse =
  paths['/v1/billing/meter_events']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_METER_EVENTS = new InjectionToken<
  (
    body: PostBillingMeterEventsBody | Signal<PostBillingMeterEventsBody>,
  ) => ReturnType<typeof httpResource<PostBillingMeterEventsResponse>>
>('POST_BILLING_METER_EVENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostBillingMeterEventsBody | Signal<PostBillingMeterEventsBody>,
    ) =>
      httpResource<PostBillingMeterEventsResponse>(() => ({
        url: `${base}/v1/billing/meter_events`,
        method: 'POST',
        body,
      }));
  },
});
