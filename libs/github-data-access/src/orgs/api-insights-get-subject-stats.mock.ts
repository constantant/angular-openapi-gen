import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_SUBJECT_STATS } from './api-insights-get-subject-stats.token';
import type { ApiInsightsGetSubjectStatsResponse } from './api-insights-get-subject-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'api-insights/get-subject-stats',
  path: '/orgs/{org}/insights/api/subject-stats',
  method: 'get',
  tag: 'orgs',
};

export function provideApiInsightsGetSubjectStatsMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetSubjectStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_SUBJECT_STATS,
    'API_INSIGHTS_GET_SUBJECT_STATS',
    initialBehavior,
    _meta,
  );
}
