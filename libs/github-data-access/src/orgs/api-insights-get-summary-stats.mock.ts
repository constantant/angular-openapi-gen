import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_SUMMARY_STATS } from './api-insights-get-summary-stats.token';
import type { ApiInsightsGetSummaryStatsResponse } from './api-insights-get-summary-stats.token';

export function provideApiInsightsGetSummaryStatsMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetSummaryStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_SUMMARY_STATS,
    'API_INSIGHTS_GET_SUMMARY_STATS',
    initialBehavior,
  );
}
