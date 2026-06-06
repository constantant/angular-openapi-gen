import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetFinancialConnectionsAccountsAccountOwnersParams =
  paths['/v1/financial_connections/accounts/{account}/owners']['get']['parameters']['query'];

export type GetFinancialConnectionsAccountsAccountOwnersResponse =
  paths['/v1/financial_connections/accounts/{account}/owners']['get']['responses']['200']['content']['application/json'];

export const GET_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_OWNERS =
  new InjectionToken<
    (
      account: string,
      params?:
        | GetFinancialConnectionsAccountsAccountOwnersParams
        | (() =>
            | GetFinancialConnectionsAccountsAccountOwnersParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<GetFinancialConnectionsAccountsAccountOwnersResponse>
    >
  >('GET_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_OWNERS');

export function provideGetFinancialConnectionsAccountsAccountOwners(): FactoryProvider {
  return {
    provide: GET_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_OWNERS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        params?:
          | GetFinancialConnectionsAccountsAccountOwnersParams
          | (() =>
              | GetFinancialConnectionsAccountsAccountOwnersParams
              | undefined),
      ) =>
        httpResource<GetFinancialConnectionsAccountsAccountOwnersResponse>(
          () => ({
            url: `${base}/v1/financial_connections/accounts/${account}/owners`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
