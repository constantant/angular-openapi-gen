import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTaxRatesTaxRateBody = NonNullable<
  paths['/v1/tax_rates/{tax_rate}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTaxRatesTaxRateResponse =
  paths['/v1/tax_rates/{tax_rate}']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_RATES_TAX_RATE = new InjectionToken<
  (
    taxRate: string,
    body: PostTaxRatesTaxRateBody | Signal<PostTaxRatesTaxRateBody>,
  ) => ReturnType<typeof httpResource<PostTaxRatesTaxRateResponse>>
>('POST_TAX_RATES_TAX_RATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      taxRate: string,
      body: PostTaxRatesTaxRateBody | Signal<PostTaxRatesTaxRateBody>,
    ) =>
      httpResource<PostTaxRatesTaxRateResponse>(() => ({
        url: `${base}/v1/tax_rates/${taxRate}`,
        method: 'POST',
        body,
      }));
  },
});
