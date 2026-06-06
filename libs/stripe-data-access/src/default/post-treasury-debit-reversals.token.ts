import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTreasuryDebitReversalsBody = NonNullable<
  paths['/v1/treasury/debit_reversals']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTreasuryDebitReversalsResponse =
  paths['/v1/treasury/debit_reversals']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_DEBIT_REVERSALS = new InjectionToken<
  (
    body:
      | PostTreasuryDebitReversalsBody
      | Signal<PostTreasuryDebitReversalsBody>,
  ) => ReturnType<typeof httpResource<PostTreasuryDebitReversalsResponse>>
>('POST_TREASURY_DEBIT_REVERSALS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostTreasuryDebitReversalsBody
        | Signal<PostTreasuryDebitReversalsBody>,
    ) =>
      httpResource<PostTreasuryDebitReversalsResponse>(() => ({
        url: `${base}/v1/treasury/debit_reversals`,
        method: 'POST',
        body,
      }));
  },
});
