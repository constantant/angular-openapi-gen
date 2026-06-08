import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_TIME_STATS } from './api-insights-get-time-stats.token';
import type { ApiInsightsGetTimeStatsResponse } from './api-insights-get-time-stats.token';

export function provideApiInsightsGetTimeStatsMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetTimeStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_TIME_STATS,
    'API_INSIGHTS_GET_TIME_STATS',
    initialBehavior,
  );
}
