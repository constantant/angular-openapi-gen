import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetFinancialConnectionsAccountsParams =
  paths['/v1/financial_connections/accounts']['get']['parameters']['query'];

export type GetFinancialConnectionsAccountsResponse =
  paths['/v1/financial_connections/accounts']['get']['responses']['200']['content']['application/json'];

export const GET_FINANCIAL_CONNECTIONS_ACCOUNTS = new InjectionToken<
  (
    params?:
      | GetFinancialConnectionsAccountsParams
      | (() => GetFinancialConnectionsAccountsParams | undefined),
  ) => ReturnType<typeof httpResource<GetFinancialConnectionsAccountsResponse>>
>('GET_FINANCIAL_CONNECTIONS_ACCOUNTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetFinancialConnectionsAccountsParams
        | (() => GetFinancialConnectionsAccountsParams | undefined),
    ) =>
      httpResource<GetFinancialConnectionsAccountsResponse>(() => ({
        url: `${base}/v1/financial_connections/accounts`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
