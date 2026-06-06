import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTreasuryFinancialAccountsFinancialAccountFeaturesParams =
  paths['/v1/treasury/financial_accounts/{financial_account}/features']['get']['parameters']['query'];

type GetTreasuryFinancialAccountsFinancialAccountFeaturesResponse =
  paths['/v1/treasury/financial_accounts/{financial_account}/features']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT_FEATURES =
  new InjectionToken<
    (
      financial_account: string,
      params?: GetTreasuryFinancialAccountsFinancialAccountFeaturesParams,
    ) => ReturnType<
      typeof httpResource<GetTreasuryFinancialAccountsFinancialAccountFeaturesResponse>
    >
  >('GET_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT_FEATURES', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        financial_account: string,
        params?: GetTreasuryFinancialAccountsFinancialAccountFeaturesParams,
      ) =>
        httpResource<GetTreasuryFinancialAccountsFinancialAccountFeaturesResponse>(
          () => ({
            url: `${base}/v1/treasury/financial_accounts/${financial_account}/features`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
