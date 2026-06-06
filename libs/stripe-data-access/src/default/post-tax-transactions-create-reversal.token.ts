import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTaxTransactionsCreateReversalBody = NonNullable<
  paths['/v1/tax/transactions/create_reversal']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTaxTransactionsCreateReversalResponse =
  paths['/v1/tax/transactions/create_reversal']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_TRANSACTIONS_CREATE_REVERSAL = new InjectionToken<
  (
    body:
      | PostTaxTransactionsCreateReversalBody
      | Signal<PostTaxTransactionsCreateReversalBody>,
  ) => ReturnType<
    typeof httpResource<PostTaxTransactionsCreateReversalResponse>
  >
>('POST_TAX_TRANSACTIONS_CREATE_REVERSAL', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostTaxTransactionsCreateReversalBody
        | Signal<PostTaxTransactionsCreateReversalBody>,
    ) =>
      httpResource<PostTaxTransactionsCreateReversalResponse>(() => ({
        url: `${base}/v1/tax/transactions/create_reversal`,
        method: 'POST',
        body,
      }));
  },
});
