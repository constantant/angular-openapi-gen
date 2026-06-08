import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_SUMMARY_STATS_BY_USER } from './api-insights-get-summary-stats-by-user.token';
import type { ApiInsightsGetSummaryStatsByUserResponse } from './api-insights-get-summary-stats-by-user.token';

export function provideApiInsightsGetSummaryStatsByUserMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetSummaryStatsByUserResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_SUMMARY_STATS_BY_USER,
    'API_INSIGHTS_GET_SUMMARY_STATS_BY_USER',
    initialBehavior,
  );
}
