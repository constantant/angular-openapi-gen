import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingMetersIdDeactivateBody = NonNullable<
  paths['/v1/billing/meters/{id}/deactivate']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingMetersIdDeactivateResponse =
  paths['/v1/billing/meters/{id}/deactivate']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_METERS_ID_DEACTIVATE = new InjectionToken<
  (
    id: string,
    body:
      | PostBillingMetersIdDeactivateBody
      | Signal<PostBillingMetersIdDeactivateBody>,
  ) => ReturnType<typeof httpResource<PostBillingMetersIdDeactivateResponse>>
>('POST_BILLING_METERS_ID_DEACTIVATE');

export function providePostBillingMetersIdDeactivate(): FactoryProvider {
  return {
    provide: POST_BILLING_METERS_ID_DEACTIVATE,
    useFactory: () => {
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
  };
}
