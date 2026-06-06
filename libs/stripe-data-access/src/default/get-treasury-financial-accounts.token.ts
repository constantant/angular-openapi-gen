import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTreasuryFinancialAccountsParams =
  paths['/v1/treasury/financial_accounts']['get']['parameters']['query'];

type GetTreasuryFinancialAccountsResponse =
  paths['/v1/treasury/financial_accounts']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_FINANCIAL_ACCOUNTS = new InjectionToken<
  (
    params?: GetTreasuryFinancialAccountsParams,
  ) => ReturnType<typeof httpResource<GetTreasuryFinancialAccountsResponse>>
>('GET_TREASURY_FINANCIAL_ACCOUNTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTreasuryFinancialAccountsParams) =>
      httpResource<GetTreasuryFinancialAccountsResponse>(() => ({
        url: `${base}/v1/treasury/financial_accounts`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
