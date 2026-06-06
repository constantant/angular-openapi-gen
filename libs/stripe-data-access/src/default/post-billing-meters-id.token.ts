import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingMetersIdBody = NonNullable<
  paths['/v1/billing/meters/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingMetersIdResponse =
  paths['/v1/billing/meters/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_METERS_ID = new InjectionToken<
  (
    id: string,
    body: PostBillingMetersIdBody | Signal<PostBillingMetersIdBody>,
  ) => ReturnType<typeof httpResource<PostBillingMetersIdResponse>>
>('POST_BILLING_METERS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body: PostBillingMetersIdBody | Signal<PostBillingMetersIdBody>,
    ) =>
      httpResource<PostBillingMetersIdResponse>(() => ({
        url: `${base}/v1/billing/meters/${id}`,
        method: 'POST',
        body,
      }));
  },
});
