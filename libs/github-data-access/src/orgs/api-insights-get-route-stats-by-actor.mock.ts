import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_ROUTE_STATS_BY_ACTOR } from './api-insights-get-route-stats-by-actor.token';
import type { ApiInsightsGetRouteStatsByActorResponse } from './api-insights-get-route-stats-by-actor.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'api-insights/get-route-stats-by-actor',
  path: '/orgs/{org}/insights/api/route-stats/{actor_type}/{actor_id}',
  method: 'get',
  tag: 'orgs',
};

export function provideApiInsightsGetRouteStatsByActorMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetRouteStatsByActorResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_ROUTE_STATS_BY_ACTOR,
    'API_INSIGHTS_GET_ROUTE_STATS_BY_ACTOR',
    initialBehavior,
    _meta,
  );
}
