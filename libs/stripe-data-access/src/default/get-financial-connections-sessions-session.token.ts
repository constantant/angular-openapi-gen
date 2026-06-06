import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetFinancialConnectionsSessionsSessionParams =
  paths['/v1/financial_connections/sessions/{session}']['get']['parameters']['query'];

export type GetFinancialConnectionsSessionsSessionResponse =
  paths['/v1/financial_connections/sessions/{session}']['get']['responses']['200']['content']['application/json'];

export const GET_FINANCIAL_CONNECTIONS_SESSIONS_SESSION = new InjectionToken<
  (
    session: string,
    params?:
      | GetFinancialConnectionsSessionsSessionParams
      | (() => GetFinancialConnectionsSessionsSessionParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetFinancialConnectionsSessionsSessionResponse>
  >
>('GET_FINANCIAL_CONNECTIONS_SESSIONS_SESSION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      session: string,
      params?:
        | GetFinancialConnectionsSessionsSessionParams
        | (() => GetFinancialConnectionsSessionsSessionParams | undefined),
    ) =>
      httpResource<GetFinancialConnectionsSessionsSessionResponse>(() => ({
        url: `${base}/v1/financial_connections/sessions/${session}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
