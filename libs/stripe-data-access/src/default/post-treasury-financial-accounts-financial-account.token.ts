import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTreasuryFinancialAccountsFinancialAccountBody = NonNullable<
  paths['/v1/treasury/financial_accounts/{financial_account}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTreasuryFinancialAccountsFinancialAccountResponse =
  paths['/v1/treasury/financial_accounts/{financial_account}']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT =
  new InjectionToken<
    (
      financialAccount: string,
      body:
        | PostTreasuryFinancialAccountsFinancialAccountBody
        | Signal<PostTreasuryFinancialAccountsFinancialAccountBody>,
    ) => ReturnType<
      typeof httpResource<PostTreasuryFinancialAccountsFinancialAccountResponse>
    >
  >('POST_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT');

export function providePostTreasuryFinancialAccountsFinancialAccount(): FactoryProvider {
  return {
    provide: POST_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        financialAccount: string,
        body:
          | PostTreasuryFinancialAccountsFinancialAccountBody
          | Signal<PostTreasuryFinancialAccountsFinancialAccountBody>,
      ) =>
        httpResource<PostTreasuryFinancialAccountsFinancialAccountResponse>(
          () => ({
            url: `${base}/v1/treasury/financial_accounts/${financialAccount}`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
