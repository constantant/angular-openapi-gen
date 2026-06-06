import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostFinancialConnectionsAccountsAccountSubscribeBody = NonNullable<
  paths['/v1/financial_connections/accounts/{account}/subscribe']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostFinancialConnectionsAccountsAccountSubscribeResponse =
  paths['/v1/financial_connections/accounts/{account}/subscribe']['post']['responses']['200']['content']['application/json'];

export const POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_SUBSCRIBE =
  new InjectionToken<
    (
      account: string,
      body:
        | PostFinancialConnectionsAccountsAccountSubscribeBody
        | Signal<PostFinancialConnectionsAccountsAccountSubscribeBody>,
    ) => ReturnType<
      typeof httpResource<PostFinancialConnectionsAccountsAccountSubscribeResponse>
    >
  >('POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_SUBSCRIBE');

export function providePostFinancialConnectionsAccountsAccountSubscribe(): FactoryProvider {
  return {
    provide: POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_SUBSCRIBE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        body:
          | PostFinancialConnectionsAccountsAccountSubscribeBody
          | Signal<PostFinancialConnectionsAccountsAccountSubscribeBody>,
      ) =>
        httpResource<PostFinancialConnectionsAccountsAccountSubscribeResponse>(
          () => ({
            url: `${base}/v1/financial_connections/accounts/${account}/subscribe`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
