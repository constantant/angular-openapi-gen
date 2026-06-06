import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSigmaScheduledQueryRunsScheduledQueryRunParams =
  paths['/v1/sigma/scheduled_query_runs/{scheduled_query_run}']['get']['parameters']['query'];

export type GetSigmaScheduledQueryRunsScheduledQueryRunResponse =
  paths['/v1/sigma/scheduled_query_runs/{scheduled_query_run}']['get']['responses']['200']['content']['application/json'];

export const GET_SIGMA_SCHEDULED_QUERY_RUNS_SCHEDULED_QUERY_RUN =
  new InjectionToken<
    (
      scheduledQueryRun: string,
      params?:
        | GetSigmaScheduledQueryRunsScheduledQueryRunParams
        | (() => GetSigmaScheduledQueryRunsScheduledQueryRunParams | undefined),
    ) => ReturnType<
      typeof httpResource<GetSigmaScheduledQueryRunsScheduledQueryRunResponse>
    >
  >('GET_SIGMA_SCHEDULED_QUERY_RUNS_SCHEDULED_QUERY_RUN');

export function provideGetSigmaScheduledQueryRunsScheduledQueryRun(): FactoryProvider {
  return {
    provide: GET_SIGMA_SCHEDULED_QUERY_RUNS_SCHEDULED_QUERY_RUN,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        scheduledQueryRun: string,
        params?:
          | GetSigmaScheduledQueryRunsScheduledQueryRunParams
          | (() =>
              | GetSigmaScheduledQueryRunsScheduledQueryRunParams
              | undefined),
      ) =>
        httpResource<GetSigmaScheduledQueryRunsScheduledQueryRunResponse>(
          () => ({
            url: `${base}/v1/sigma/scheduled_query_runs/${scheduledQueryRun}`,
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
