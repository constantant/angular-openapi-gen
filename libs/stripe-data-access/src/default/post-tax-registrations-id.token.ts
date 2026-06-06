import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTaxRegistrationsIdBody = NonNullable<
  paths['/v1/tax/registrations/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTaxRegistrationsIdResponse =
  paths['/v1/tax/registrations/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_REGISTRATIONS_ID = new InjectionToken<
  (
    id: string,
    body: PostTaxRegistrationsIdBody | Signal<PostTaxRegistrationsIdBody>,
  ) => ReturnType<typeof httpResource<PostTaxRegistrationsIdResponse>>
>('POST_TAX_REGISTRATIONS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body: PostTaxRegistrationsIdBody | Signal<PostTaxRegistrationsIdBody>,
    ) =>
      httpResource<PostTaxRegistrationsIdResponse>(() => ({
        url: `${base}/v1/tax/registrations/${id}`,
        method: 'POST',
        body,
      }));
  },
});
