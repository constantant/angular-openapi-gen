import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_SUMMARY_STATS_BY_USER } from './api-insights-get-summary-stats-by-user.token';
import type { ApiInsightsGetSummaryStatsByUserResponse } from './api-insights-get-summary-stats-by-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'api-insights/get-summary-stats-by-user',
  path: '/orgs/{org}/insights/api/summary-stats/users/{user_id}',
  method: 'get',
  tag: 'orgs',
};

export function provideApiInsightsGetSummaryStatsByUserMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetSummaryStatsByUserResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_SUMMARY_STATS_BY_USER,
    'API_INSIGHTS_GET_SUMMARY_STATS_BY_USER',
    initialBehavior,
    _meta,
  );
}
