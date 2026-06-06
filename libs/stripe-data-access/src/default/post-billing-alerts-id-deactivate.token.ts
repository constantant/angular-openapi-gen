import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingAlertsIdDeactivateBody = NonNullable<
  paths['/v1/billing/alerts/{id}/deactivate']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingAlertsIdDeactivateResponse =
  paths['/v1/billing/alerts/{id}/deactivate']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_ALERTS_ID_DEACTIVATE = new InjectionToken<
  (
    id: string,
    body:
      | PostBillingAlertsIdDeactivateBody
      | Signal<PostBillingAlertsIdDeactivateBody>,
  ) => ReturnType<typeof httpResource<PostBillingAlertsIdDeactivateResponse>>
>('POST_BILLING_ALERTS_ID_DEACTIVATE');

export function providePostBillingAlertsIdDeactivate(): FactoryProvider {
  return {
    provide: POST_BILLING_ALERTS_ID_DEACTIVATE,
    useFactory: () => {
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
  };
}
