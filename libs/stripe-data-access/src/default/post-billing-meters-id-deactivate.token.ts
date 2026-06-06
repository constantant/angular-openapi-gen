import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostBillingMetersIdDeactivateBody = NonNullable<
  paths['/v1/billing/meters/{id}/deactivate']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostBillingMetersIdDeactivateResponse =
  paths['/v1/billing/meters/{id}/deactivate']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_METERS_ID_DEACTIVATE = new InjectionToken<
  (
    id: string,
    body:
      | PostBillingMetersIdDeactivateBody
      | Signal<PostBillingMetersIdDeactivateBody>,
  ) => ReturnType<typeof httpResource<PostBillingMetersIdDeactivateResponse>>
>('POST_BILLING_METERS_ID_DEACTIVATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body:
        | PostBillingMetersIdDeactivateBody
        | Signal<PostBillingMetersIdDeactivateBody>,
    ) =>
      httpResource<PostBillingMetersIdDeactivateResponse>(() => ({
        url: `${base}/v1/billing/meters/${id}/deactivate`,
        method: 'POST',
        body,
      }));
  },
});
