import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTreasuryFinancialAccountsFinancialAccountBody = NonNullable<
  paths['/v1/treasury/financial_accounts/{financial_account}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTreasuryFinancialAccountsFinancialAccountResponse =
  paths['/v1/treasury/financial_accounts/{financial_account}']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT =
  new InjectionToken<
    (
      financial_account: string,
      body:
        | PostTreasuryFinancialAccountsFinancialAccountBody
        | Signal<PostTreasuryFinancialAccountsFinancialAccountBody>,
    ) => ReturnType<
      typeof httpResource<PostTreasuryFinancialAccountsFinancialAccountResponse>
    >
  >('POST_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        financial_account: string,
        body:
          | PostTreasuryFinancialAccountsFinancialAccountBody
          | Signal<PostTreasuryFinancialAccountsFinancialAccountBody>,
      ) =>
        httpResource<PostTreasuryFinancialAccountsFinancialAccountResponse>(
          () => ({
            url: `${base}/v1/treasury/financial_accounts/${financial_account}`,
            method: 'POST',
            body,
          }),
        );
    },
  });
