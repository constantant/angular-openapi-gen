import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTreasuryFinancialAccountsBody = NonNullable<
  paths['/v1/treasury/financial_accounts']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTreasuryFinancialAccountsResponse =
  paths['/v1/treasury/financial_accounts']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_FINANCIAL_ACCOUNTS = new InjectionToken<
  (
    body:
      | PostTreasuryFinancialAccountsBody
      | Signal<PostTreasuryFinancialAccountsBody>,
  ) => ReturnType<typeof httpResource<PostTreasuryFinancialAccountsResponse>>
>('POST_TREASURY_FINANCIAL_ACCOUNTS');

export function providePostTreasuryFinancialAccounts(): FactoryProvider {
  return {
    provide: POST_TREASURY_FINANCIAL_ACCOUNTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostTreasuryFinancialAccountsBody
          | Signal<PostTreasuryFinancialAccountsBody>,
      ) =>
        httpResource<PostTreasuryFinancialAccountsResponse>(() => ({
          url: `${base}/v1/treasury/financial_accounts`,
          method: 'POST',
          body,
        }));
    },
  };
}
