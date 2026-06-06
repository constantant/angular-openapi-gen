import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSigmaScheduledQueryRunsParams =
  paths['/v1/sigma/scheduled_query_runs']['get']['parameters']['query'];

export type GetSigmaScheduledQueryRunsResponse =
  paths['/v1/sigma/scheduled_query_runs']['get']['responses']['200']['content']['application/json'];

export const GET_SIGMA_SCHEDULED_QUERY_RUNS = new InjectionToken<
  (
    params?:
      | GetSigmaScheduledQueryRunsParams
      | (() => GetSigmaScheduledQueryRunsParams | undefined),
  ) => ReturnType<typeof httpResource<GetSigmaScheduledQueryRunsResponse>>
>('GET_SIGMA_SCHEDULED_QUERY_RUNS');

export function provideGetSigmaScheduledQueryRuns(): FactoryProvider {
  return {
    provide: GET_SIGMA_SCHEDULED_QUERY_RUNS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetSigmaScheduledQueryRunsParams
          | (() => GetSigmaScheduledQueryRunsParams | undefined),
      ) =>
        httpResource<GetSigmaScheduledQueryRunsResponse>(() => ({
          url: `${base}/v1/sigma/scheduled_query_runs`,
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
