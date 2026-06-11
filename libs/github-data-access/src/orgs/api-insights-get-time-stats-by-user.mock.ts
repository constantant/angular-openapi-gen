import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { API_INSIGHTS_GET_TIME_STATS_BY_USER } from './api-insights-get-time-stats-by-user.token';
import type { ApiInsightsGetTimeStatsByUserResponse } from './api-insights-get-time-stats-by-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'api-insights/get-time-stats-by-user',
  path: '/orgs/{org}/insights/api/time-stats/users/{user_id}',
  method: 'get',
  tag: 'orgs',
};

export function provideApiInsightsGetTimeStatsByUserMock(
  initialBehavior?: ProviderInitialBehavior<ApiInsightsGetTimeStatsByUserResponse>,
): FactoryProvider {
  return provideMockResource(
    API_INSIGHTS_GET_TIME_STATS_BY_USER,
    'API_INSIGHTS_GET_TIME_STATS_BY_USER',
    initialBehavior,
    _meta,
  );
}
