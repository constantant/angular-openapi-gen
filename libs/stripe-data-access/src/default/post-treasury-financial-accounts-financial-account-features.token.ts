import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTreasuryFinancialAccountsFinancialAccountFeaturesBody =
  NonNullable<
    paths['/v1/treasury/financial_accounts/{financial_account}/features']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTreasuryFinancialAccountsFinancialAccountFeaturesResponse =
  paths['/v1/treasury/financial_accounts/{financial_account}/features']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT_FEATURES =
  new InjectionToken<
    (
      financialAccount: string,
      body:
        | PostTreasuryFinancialAccountsFinancialAccountFeaturesBody
        | Signal<PostTreasuryFinancialAccountsFinancialAccountFeaturesBody>,
    ) => ReturnType<
      typeof httpResource<PostTreasuryFinancialAccountsFinancialAccountFeaturesResponse>
    >
  >('POST_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT_FEATURES', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        financialAccount: string,
        body:
          | PostTreasuryFinancialAccountsFinancialAccountFeaturesBody
          | Signal<PostTreasuryFinancialAccountsFinancialAccountFeaturesBody>,
      ) =>
        httpResource<PostTreasuryFinancialAccountsFinancialAccountFeaturesResponse>(
          () => ({
            url: `${base}/v1/treasury/financial_accounts/${financialAccount}/features`,
            method: 'POST',
            body,
          }),
        );
    },
  });
