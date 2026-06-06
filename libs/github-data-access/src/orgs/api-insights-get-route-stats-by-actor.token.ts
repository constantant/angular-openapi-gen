import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ApiInsightsGetRouteStatsByActorParams =
  paths['/orgs/{org}/insights/api/route-stats/{actor_type}/{actor_id}']['get']['parameters']['query'];

export type ApiInsightsGetRouteStatsByActorResponse =
  paths['/orgs/{org}/insights/api/route-stats/{actor_type}/{actor_id}']['get']['responses']['200']['content']['application/json'];

export const API_INSIGHTS_GET_ROUTE_STATS_BY_ACTOR = new InjectionToken<
  (
    org: string,
    actorType: string,
    actorId: string,
    params?:
      | ApiInsightsGetRouteStatsByActorParams
      | (() => ApiInsightsGetRouteStatsByActorParams | undefined),
  ) => ReturnType<typeof httpResource<ApiInsightsGetRouteStatsByActorResponse>>
>('API_INSIGHTS_GET_ROUTE_STATS_BY_ACTOR');

export function provideApiInsightsGetRouteStatsByActor(): FactoryProvider {
  return {
    provide: API_INSIGHTS_GET_ROUTE_STATS_BY_ACTOR,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        actorType: string,
        actorId: string,
        params?:
          | ApiInsightsGetRouteStatsByActorParams
          | (() => ApiInsightsGetRouteStatsByActorParams | undefined),
      ) =>
        httpResource<ApiInsightsGetRouteStatsByActorResponse>(() => ({
          url: `${base}/orgs/${org}/insights/api/route-stats/${actorType}/${actorId}`,
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
