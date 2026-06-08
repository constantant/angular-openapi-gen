import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_SUBJECT_STATS } from './api-insights-get-subject-stats.token';
import type { ApiInsightsGetSubjectStatsResponse } from './api-insights-get-subject-stats.token';

export function provideApiInsightsGetSubjectStatsMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetSubjectStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_SUBJECT_STATS,
    'API_INSIGHTS_GET_SUBJECT_STATS',
    initialBehavior,
  );
}
