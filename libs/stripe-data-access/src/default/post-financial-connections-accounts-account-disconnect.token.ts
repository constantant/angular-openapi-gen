import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostFinancialConnectionsAccountsAccountDisconnectBody = NonNullable<
  paths['/v1/financial_connections/accounts/{account}/disconnect']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostFinancialConnectionsAccountsAccountDisconnectResponse =
  paths['/v1/financial_connections/accounts/{account}/disconnect']['post']['responses']['200']['content']['application/json'];

export const POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_DISCONNECT =
  new InjectionToken<
    (
      account: string,
      body:
        | PostFinancialConnectionsAccountsAccountDisconnectBody
        | Signal<PostFinancialConnectionsAccountsAccountDisconnectBody>,
    ) => ReturnType<
      typeof httpResource<PostFinancialConnectionsAccountsAccountDisconnectResponse>
    >
  >('POST_FINANCIAL_CONNECTIONS_ACCOUNTS_ACCOUNT_DISCONNECT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        body:
          | PostFinancialConnectionsAccountsAccountDisconnectBody
          | Signal<PostFinancialConnectionsAccountsAccountDisconnectBody>,
      ) =>
        httpResource<PostFinancialConnectionsAccountsAccountDisconnectResponse>(
          () => ({
            url: `${base}/v1/financial_connections/accounts/${account}/disconnect`,
            method: 'POST',
            body,
          }),
        );
    },
  });
