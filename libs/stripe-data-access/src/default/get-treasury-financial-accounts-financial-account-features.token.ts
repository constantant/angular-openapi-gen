import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryFinancialAccountsFinancialAccountFeaturesParams =
  paths['/v1/treasury/financial_accounts/{financial_account}/features']['get']['parameters']['query'];

export type GetTreasuryFinancialAccountsFinancialAccountFeaturesResponse =
  paths['/v1/treasury/financial_accounts/{financial_account}/features']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT_FEATURES =
  new InjectionToken<
    (
      financialAccount: string,
      params?:
        | GetTreasuryFinancialAccountsFinancialAccountFeaturesParams
        | (() =>
            | GetTreasuryFinancialAccountsFinancialAccountFeaturesParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<GetTreasuryFinancialAccountsFinancialAccountFeaturesResponse>
    >
  >('GET_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT_FEATURES', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        financialAccount: string,
        params?:
          | GetTreasuryFinancialAccountsFinancialAccountFeaturesParams
          | (() =>
              | GetTreasuryFinancialAccountsFinancialAccountFeaturesParams
              | undefined),
      ) =>
        httpResource<GetTreasuryFinancialAccountsFinancialAccountFeaturesResponse>(
          () => ({
            url: `${base}/v1/treasury/financial_accounts/${financialAccount}/features`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
