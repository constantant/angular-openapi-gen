import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ApiInsightsGetTimeStatsByActorParams =
  paths['/orgs/{org}/insights/api/time-stats/{actor_type}/{actor_id}']['get']['parameters']['query'];

export type ApiInsightsGetTimeStatsByActorResponse =
  paths['/orgs/{org}/insights/api/time-stats/{actor_type}/{actor_id}']['get']['responses']['200']['content']['application/json'];

export const API_INSIGHTS_GET_TIME_STATS_BY_ACTOR = new InjectionToken<
  (
    org: string,
    actorType: string,
    actorId: string,
    params?:
      | ApiInsightsGetTimeStatsByActorParams
      | (() => ApiInsightsGetTimeStatsByActorParams | undefined),
  ) => ReturnType<typeof httpResource<ApiInsightsGetTimeStatsByActorResponse>>
>('API_INSIGHTS_GET_TIME_STATS_BY_ACTOR');

export function provideApiInsightsGetTimeStatsByActor(): FactoryProvider {
  return {
    provide: API_INSIGHTS_GET_TIME_STATS_BY_ACTOR,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        actorType: string,
        actorId: string,
        params?:
          | ApiInsightsGetTimeStatsByActorParams
          | (() => ApiInsightsGetTimeStatsByActorParams | undefined),
      ) =>
        httpResource<ApiInsightsGetTimeStatsByActorResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/insights/api/time-stats/${actorType}/${actorId}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
