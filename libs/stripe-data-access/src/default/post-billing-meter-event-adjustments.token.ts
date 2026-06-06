import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingMeterEventAdjustmentsBody = NonNullable<
  paths['/v1/billing/meter_event_adjustments']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingMeterEventAdjustmentsResponse =
  paths['/v1/billing/meter_event_adjustments']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_METER_EVENT_ADJUSTMENTS = new InjectionToken<
  (
    body:
      | PostBillingMeterEventAdjustmentsBody
      | Signal<PostBillingMeterEventAdjustmentsBody>,
  ) => ReturnType<typeof httpResource<PostBillingMeterEventAdjustmentsResponse>>
>('POST_BILLING_METER_EVENT_ADJUSTMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostBillingMeterEventAdjustmentsBody
        | Signal<PostBillingMeterEventAdjustmentsBody>,
    ) =>
      httpResource<PostBillingMeterEventAdjustmentsResponse>(() => ({
        url: `${base}/v1/billing/meter_event_adjustments`,
        method: 'POST',
        body,
      }));
  },
});
