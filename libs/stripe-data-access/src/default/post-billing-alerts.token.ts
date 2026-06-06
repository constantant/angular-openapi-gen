import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingAlertsBody = NonNullable<
  paths['/v1/billing/alerts']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingAlertsResponse =
  paths['/v1/billing/alerts']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_ALERTS = new InjectionToken<
  (
    body: PostBillingAlertsBody | Signal<PostBillingAlertsBody>,
  ) => ReturnType<typeof httpResource<PostBillingAlertsResponse>>
>('POST_BILLING_ALERTS');

export function providePostBillingAlerts(): FactoryProvider {
  return {
    provide: POST_BILLING_ALERTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostBillingAlertsBody | Signal<PostBillingAlertsBody>) =>
        httpResource<PostBillingAlertsResponse>(() => ({
          url: `${base}/v1/billing/alerts`,
          method: 'POST',
          body,
        }));
    },
  };
}
