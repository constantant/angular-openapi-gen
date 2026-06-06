import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetFinancialConnectionsAccountsAccountParams =
  paths['/v1/financial_connections/accounts/{account}']['get']['parameters']['query'];

export type GetFinancialConnectionsAccountsAccountResponse =
  paths['/v1/financial_connections/accounts/{account}']['get']['responses']['200']['content']['application/json'];

export const GET_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT = new InjectionToken<
  (
    account: string,
    params?:
      | GetFinancialConnectionsAccountsAccountParams
      | (() => GetFinancialConnectionsAccountsAccountParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetFinancialConnectionsAccountsAccountResponse>
  >
>('GET_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT');

export function provideGetFinancialConnectionsAccountsAccount(): FactoryProvider {
  return {
    provide: GET_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        params?:
          | GetFinancialConnectionsAccountsAccountParams
          | (() => GetFinancialConnectionsAccountsAccountParams | undefined),
      ) =>
        httpResource<GetFinancialConnectionsAccountsAccountResponse>(() => ({
          url: `${base}/v1/financial_connections/accounts/${account}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
