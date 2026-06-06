import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingAlertsIdArchiveBody = NonNullable<
  paths['/v1/billing/alerts/{id}/archive']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingAlertsIdArchiveResponse =
  paths['/v1/billing/alerts/{id}/archive']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_ALERTS_ID_ARCHIVE = new InjectionToken<
  (
    id: string,
    body:
      | PostBillingAlertsIdArchiveBody
      | Signal<PostBillingAlertsIdArchiveBody>,
  ) => ReturnType<typeof httpResource<PostBillingAlertsIdArchiveResponse>>
>('POST_BILLING_ALERTS_ID_ARCHIVE');

export function providePostBillingAlertsIdArchive(): FactoryProvider {
  return {
    provide: POST_BILLING_ALERTS_ID_ARCHIVE,
    useFactory: () => {
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
  };
}
