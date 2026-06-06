import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTaxRegistrationsBody = NonNullable<
  paths['/v1/tax/registrations']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTaxRegistrationsResponse =
  paths['/v1/tax/registrations']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_REGISTRATIONS = new InjectionToken<
  (
    body: PostTaxRegistrationsBody | Signal<PostTaxRegistrationsBody>,
  ) => ReturnType<typeof httpResource<PostTaxRegistrationsResponse>>
>('POST_TAX_REGISTRATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostTaxRegistrationsBody | Signal<PostTaxRegistrationsBody>,
    ) =>
      httpResource<PostTaxRegistrationsResponse>(() => ({
        url: `${base}/v1/tax/registrations`,
        method: 'POST',
        body,
      }));
  },
});
