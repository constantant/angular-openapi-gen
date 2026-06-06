import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTaxRegistrationsBody = NonNullable<
  paths['/v1/tax/registrations']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTaxRegistrationsResponse =
  paths['/v1/tax/registrations']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_REGISTRATIONS = new InjectionToken<
  (
    body: PostTaxRegistrationsBody | Signal<PostTaxRegistrationsBody>,
  ) => ReturnType<typeof httpResource<PostTaxRegistrationsResponse>>
>('POST_TAX_REGISTRATIONS');

export function providePostTaxRegistrations(): FactoryProvider {
  return {
    provide: POST_TAX_REGISTRATIONS,
    useFactory: () => {
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
  };
}
