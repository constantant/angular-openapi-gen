import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetFinancialConnectionsAccountsAccountParams =
  paths['/v1/financial_connections/accounts/{account}']['get']['parameters']['query'];

type GetFinancialConnectionsAccountsAccountResponse =
  paths['/v1/financial_connections/accounts/{account}']['get']['responses']['200']['content']['application/json'];

export const GET_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT = new InjectionToken<
  (
    account: string,
    params?: GetFinancialConnectionsAccountsAccountParams,
  ) => ReturnType<
    typeof httpResource<GetFinancialConnectionsAccountsAccountResponse>
  >
>('GET_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      account: string,
      params?: GetFinancialConnectionsAccountsAccountParams,
    ) =>
      httpResource<GetFinancialConnectionsAccountsAccountResponse>(() => ({
        url: `${base}/v1/financial_connections/accounts/${account}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
