import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTaxTransactionsCreateFromCalculationBody = NonNullable<
  paths['/v1/tax/transactions/create_from_calculation']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTaxTransactionsCreateFromCalculationResponse =
  paths['/v1/tax/transactions/create_from_calculation']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_TRANSACTIONS_CREATE_FROM_CALCULATION = new InjectionToken<
  (
    body:
      | PostTaxTransactionsCreateFromCalculationBody
      | Signal<PostTaxTransactionsCreateFromCalculationBody>,
  ) => ReturnType<
    typeof httpResource<PostTaxTransactionsCreateFromCalculationResponse>
  >
>('POST_TAX_TRANSACTIONS_CREATE_FROM_CALCULATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostTaxTransactionsCreateFromCalculationBody
        | Signal<PostTaxTransactionsCreateFromCalculationBody>,
    ) =>
      httpResource<PostTaxTransactionsCreateFromCalculationResponse>(() => ({
        url: `${base}/v1/tax/transactions/create_from_calculation`,
        method: 'POST',
        body,
      }));
  },
});
