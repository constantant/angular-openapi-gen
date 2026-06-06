import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSigmaScheduledQueryRunsScheduledQueryRunParams =
  paths['/v1/sigma/scheduled_query_runs/{scheduled_query_run}']['get']['parameters']['query'];

type GetSigmaScheduledQueryRunsScheduledQueryRunResponse =
  paths['/v1/sigma/scheduled_query_runs/{scheduled_query_run}']['get']['responses']['200']['content']['application/json'];

export const GET_SIGMA_SCHEDULED_QUERY_RUNS_SCHEDULED_QUERY_RUN =
  new InjectionToken<
    (
      scheduled_query_run: string,
      params?: GetSigmaScheduledQueryRunsScheduledQueryRunParams,
    ) => ReturnType<
      typeof httpResource<GetSigmaScheduledQueryRunsScheduledQueryRunResponse>
    >
  >('GET_SIGMA_SCHEDULED_QUERY_RUNS_SCHEDULED_QUERY_RUN', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        scheduled_query_run: string,
        params?: GetSigmaScheduledQueryRunsScheduledQueryRunParams,
      ) =>
        httpResource<GetSigmaScheduledQueryRunsScheduledQueryRunResponse>(
          () => ({
            url: `${base}/v1/sigma/scheduled_query_runs/${scheduled_query_run}`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
