import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingMetersBody = NonNullable<
  paths['/v1/billing/meters']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingMetersResponse =
  paths['/v1/billing/meters']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_METERS = new InjectionToken<
  (
    body: PostBillingMetersBody | Signal<PostBillingMetersBody>,
  ) => ReturnType<typeof httpResource<PostBillingMetersResponse>>
>('POST_BILLING_METERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostBillingMetersBody | Signal<PostBillingMetersBody>) =>
      httpResource<PostBillingMetersResponse>(() => ({
        url: `${base}/v1/billing/meters`,
        method: 'POST',
        body,
      }));
  },
});
