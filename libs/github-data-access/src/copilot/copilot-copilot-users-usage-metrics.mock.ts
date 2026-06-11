import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_USERS_USAGE_METRICS } from './copilot-copilot-users-usage-metrics.token';
import type { CopilotCopilotUsersUsageMetricsResponse } from './copilot-copilot-users-usage-metrics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/copilot-users-usage-metrics',
  path: '/enterprises/{enterprise}/copilot/metrics/reports/users-28-day/latest',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotCopilotUsersUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotUsersUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_USERS_USAGE_METRICS,
    'COPILOT_COPILOT_USERS_USAGE_METRICS',
    initialBehavior,
    _meta,
  );
}
