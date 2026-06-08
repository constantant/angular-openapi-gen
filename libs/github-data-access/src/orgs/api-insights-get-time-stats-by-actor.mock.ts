import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_TIME_STATS_BY_ACTOR } from './api-insights-get-time-stats-by-actor.token';
import type { ApiInsightsGetTimeStatsByActorResponse } from './api-insights-get-time-stats-by-actor.token';

export function provideApiInsightsGetTimeStatsByActorMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetTimeStatsByActorResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_TIME_STATS_BY_ACTOR,
    'API_INSIGHTS_GET_TIME_STATS_BY_ACTOR',
    initialBehavior,
  );
}
