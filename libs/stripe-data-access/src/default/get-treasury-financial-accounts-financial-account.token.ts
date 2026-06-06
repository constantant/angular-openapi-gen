import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryFinancialAccountsFinancialAccountParams =
  paths['/v1/treasury/financial_accounts/{financial_account}']['get']['parameters']['query'];

export type GetTreasuryFinancialAccountsFinancialAccountResponse =
  paths['/v1/treasury/financial_accounts/{financial_account}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT =
  new InjectionToken<
    (
      financialAccount: string,
      params?:
        | GetTreasuryFinancialAccountsFinancialAccountParams
        | (() =>
            | GetTreasuryFinancialAccountsFinancialAccountParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<GetTreasuryFinancialAccountsFinancialAccountResponse>
    >
  >('GET_TREASURY_FINANCIAL_ACCOUNTS_FINANCIAL_ACCOUNT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        financialAccount: string,
        params?:
          | GetTreasuryFinancialAccountsFinancialAccountParams
          | (() =>
              | GetTreasuryFinancialAccountsFinancialAccountParams
              | undefined),
      ) =>
        httpResource<GetTreasuryFinancialAccountsFinancialAccountResponse>(
          () => ({
            url: `${base}/v1/treasury/financial_accounts/${financialAccount}`,
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
