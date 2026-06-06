import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTreasuryFinancialAccountsFinancialAccountCloseBody = NonNullable<
  paths['/v1/treasury/financial_accounts/{financial_account}/close']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTreasuryFinancialAccountsFinancialAccountCloseResponse =
  paths['/v1/treasury/financial_accounts/{financial_account}/close']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT_CLOSE =
  new InjectionToken<
    (
      financial_account: string,
      body:
        | PostTreasuryFinancialAccountsFinancialAccountCloseBody
        | Signal<PostTreasuryFinancialAccountsFinancialAccountCloseBody>,
    ) => ReturnType<
      typeof httpResource<PostTreasuryFinancialAccountsFinancialAccountCloseResponse>
    >
  >('POST_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT_CLOSE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        financial_account: string,
        body:
          | PostTreasuryFinancialAccountsFinancialAccountCloseBody
          | Signal<PostTreasuryFinancialAccountsFinancialAccountCloseBody>,
      ) =>
        httpResource<PostTreasuryFinancialAccountsFinancialAccountCloseResponse>(
          () => ({
            url: `${base}/v1/treasury/financial_accounts/${financial_account}/close`,
            method: 'POST',
            body,
          }),
        );
    },
  });
