import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostFinancialConnectionsAccountsAccountUnsubscribeBody =
  NonNullable<
    paths['/v1/financial_connections/accounts/{account}/unsubscribe']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostFinancialConnectionsAccountsAccountUnsubscribeResponse =
  paths['/v1/financial_connections/accounts/{account}/unsubscribe']['post']['responses']['200']['content']['application/json'];

export const POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_UNSUBSCRIBE =
  new InjectionToken<
    (
      account: string,
      body:
        | PostFinancialConnectionsAccountsAccountUnsubscribeBody
        | Signal<PostFinancialConnectionsAccountsAccountUnsubscribeBody>,
    ) => ReturnType<
      typeof httpResource<PostFinancialConnectionsAccountsAccountUnsubscribeResponse>
    >
  >('POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_UNSUBSCRIBE');

export function providePostFinancialConnectionsAccountsAccountUnsubscribe(): FactoryProvider {
  return {
    provide: POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_UNSUBSCRIBE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        body:
          | PostFinancialConnectionsAccountsAccountUnsubscribeBody
          | Signal<PostFinancialConnectionsAccountsAccountUnsubscribeBody>,
      ) =>
        httpResource<PostFinancialConnectionsAccountsAccountUnsubscribeResponse>(
          () => ({
            url: `${base}/v1/financial_connections/accounts/${account}/unsubscribe`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
