import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_SUMMARY_STATS_BY_ACTOR } from './api-insights-get-summary-stats-by-actor.token';
import type { ApiInsightsGetSummaryStatsByActorResponse } from './api-insights-get-summary-stats-by-actor.token';

export function provideApiInsightsGetSummaryStatsByActorMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetSummaryStatsByActorResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_SUMMARY_STATS_BY_ACTOR,
    'API_INSIGHTS_GET_SUMMARY_STATS_BY_ACTOR',
    initialBehavior,
  );
}
