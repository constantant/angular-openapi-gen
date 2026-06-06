import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostFinancialConnectionsAccountsAccountRefreshBody = NonNullable<
  paths['/v1/financial_connections/accounts/{account}/refresh']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostFinancialConnectionsAccountsAccountRefreshResponse =
  paths['/v1/financial_connections/accounts/{account}/refresh']['post']['responses']['200']['content']['application/json'];

export const POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_REFRESH =
  new InjectionToken<
    (
      account: string,
      body:
        | PostFinancialConnectionsAccountsAccountRefreshBody
        | Signal<PostFinancialConnectionsAccountsAccountRefreshBody>,
    ) => ReturnType<
      typeof httpResource<PostFinancialConnectionsAccountsAccountRefreshResponse>
    >
  >('POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_REFRESH');

export function providePostFinancialConnectionsAccountsAccountRefresh(): FactoryProvider {
  return {
    provide: POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_REFRESH,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        body:
          | PostFinancialConnectionsAccountsAccountRefreshBody
          | Signal<PostFinancialConnectionsAccountsAccountRefreshBody>,
      ) =>
        httpResource<PostFinancialConnectionsAccountsAccountRefreshResponse>(
          () => ({
            url: `${base}/v1/financial_connections/accounts/${account}/refresh`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
