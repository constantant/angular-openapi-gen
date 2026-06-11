import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_USER_STATS } from './api-insights-get-user-stats.token';
import type { ApiInsightsGetUserStatsResponse } from './api-insights-get-user-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'api-insights/get-user-stats',
  path: '/orgs/{org}/insights/api/user-stats/{user_id}',
  method: 'get',
  tag: 'orgs',
};

export function provideApiInsightsGetUserStatsMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetUserStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_USER_STATS,
    'API_INSIGHTS_GET_USER_STATS',
    initialBehavior,
    _meta,
  );
}
