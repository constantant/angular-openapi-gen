import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingMetersIdReactivateBody = NonNullable<
  paths['/v1/billing/meters/{id}/reactivate']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingMetersIdReactivateResponse =
  paths['/v1/billing/meters/{id}/reactivate']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_METERS_ID_REACTIVATE = new InjectionToken<
  (
    id: string,
    body:
      | PostBillingMetersIdReactivateBody
      | Signal<PostBillingMetersIdReactivateBody>,
  ) => ReturnType<typeof httpResource<PostBillingMetersIdReactivateResponse>>
>('POST_BILLING_METERS_ID_REACTIVATE');

export function providePostBillingMetersIdReactivate(): FactoryProvider {
  return {
    provide: POST_BILLING_METERS_ID_REACTIVATE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostBillingMetersIdReactivateBody
          | Signal<PostBillingMetersIdReactivateBody>,
      ) =>
        httpResource<PostBillingMetersIdReactivateResponse>(() => ({
          url: `${base}/v1/billing/meters/${id}/reactivate`,
          method: 'POST',
          body,
        }));
    },
  };
}
