import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostFinancialConnectionsSessionsBody = NonNullable<
  paths['/v1/financial_connections/sessions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostFinancialConnectionsSessionsResponse =
  paths['/v1/financial_connections/sessions']['post']['responses']['200']['content']['application/json'];

export const POST_FINANCIAL_CONNECTIONS_SESSIONS = new InjectionToken<
  (
    body:
      | PostFinancialConnectionsSessionsBody
      | Signal<PostFinancialConnectionsSessionsBody>,
  ) => ReturnType<typeof httpResource<PostFinancialConnectionsSessionsResponse>>
>('POST_FINANCIAL_CONNECTIONS_SESSIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostFinancialConnectionsSessionsBody
        | Signal<PostFinancialConnectionsSessionsBody>,
    ) =>
      httpResource<PostFinancialConnectionsSessionsResponse>(() => ({
        url: `${base}/v1/financial_connections/sessions`,
        method: 'POST',
        body,
      }));
  },
});
