import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ApiInsightsGetSummaryStatsByActorParams =
  paths['/orgs/{org}/insights/api/summary-stats/{actor_type}/{actor_id}']['get']['parameters']['query'];

export type ApiInsightsGetSummaryStatsByActorResponse =
  paths['/orgs/{org}/insights/api/summary-stats/{actor_type}/{actor_id}']['get']['responses']['200']['content']['application/json'];

export const API_INSIGHTS_GET_SUMMARY_STATS_BY_ACTOR = new InjectionToken<
  (
    org: string,
    actorType: string,
    actorId: string,
    params?:
      | ApiInsightsGetSummaryStatsByActorParams
      | (() => ApiInsightsGetSummaryStatsByActorParams | undefined),
  ) => ReturnType<
    typeof httpResource<ApiInsightsGetSummaryStatsByActorResponse>
  >
>('API_INSIGHTS_GET_SUMMARY_STATS_BY_ACTOR', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      actorType: string,
      actorId: string,
      params?:
        | ApiInsightsGetSummaryStatsByActorParams
        | (() => ApiInsightsGetSummaryStatsByActorParams | undefined),
    ) =>
      httpResource<ApiInsightsGetSummaryStatsByActorResponse>(() => ({
        url: `${base}/orgs/${org}/insights/api/summary-stats/${actorType}/${actorId}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
