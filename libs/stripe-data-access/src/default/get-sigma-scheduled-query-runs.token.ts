import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSigmaScheduledQueryRunsParams =
  paths['/v1/sigma/scheduled_query_runs']['get']['parameters']['query'];

type GetSigmaScheduledQueryRunsResponse =
  paths['/v1/sigma/scheduled_query_runs']['get']['responses']['200']['content']['application/json'];

export const GET_SIGMA_SCHEDULED_QUERY_RUNS = new InjectionToken<
  (
    params?: GetSigmaScheduledQueryRunsParams,
  ) => ReturnType<typeof httpResource<GetSigmaScheduledQueryRunsResponse>>
>('GET_SIGMA_SCHEDULED_QUERY_RUNS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetSigmaScheduledQueryRunsParams) =>
      httpResource<GetSigmaScheduledQueryRunsResponse>(() => ({
        url: `${base}/v1/sigma/scheduled_query_runs`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
