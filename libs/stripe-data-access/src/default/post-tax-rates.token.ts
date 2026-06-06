import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTaxRatesBody = NonNullable<
  paths['/v1/tax_rates']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTaxRatesResponse =
  paths['/v1/tax_rates']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_RATES = new InjectionToken<
  (
    body: PostTaxRatesBody | Signal<PostTaxRatesBody>,
  ) => ReturnType<typeof httpResource<PostTaxRatesResponse>>
>('POST_TAX_RATES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostTaxRatesBody | Signal<PostTaxRatesBody>) =>
      httpResource<PostTaxRatesResponse>(() => ({
        url: `${base}/v1/tax_rates`,
        method: 'POST',
        body,
      }));
  },
});
