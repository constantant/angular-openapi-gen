import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTaxRegistrationsIdBody = NonNullable<
  paths['/v1/tax/registrations/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTaxRegistrationsIdResponse =
  paths['/v1/tax/registrations/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_REGISTRATIONS_ID = new InjectionToken<
  (
    id: string,
    body: PostTaxRegistrationsIdBody | Signal<PostTaxRegistrationsIdBody>,
  ) => ReturnType<typeof httpResource<PostTaxRegistrationsIdResponse>>
>('POST_TAX_REGISTRATIONS_ID');

export function providePostTaxRegistrationsId(): FactoryProvider {
  return {
    provide: POST_TAX_REGISTRATIONS_ID,
    useFactory: () => {
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
  };
}
