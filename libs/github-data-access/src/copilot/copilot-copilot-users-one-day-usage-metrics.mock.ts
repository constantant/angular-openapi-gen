import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_USERS_ONE_DAY_USAGE_METRICS } from './copilot-copilot-users-one-day-usage-metrics.token';
import type { CopilotCopilotUsersOneDayUsageMetricsResponse } from './copilot-copilot-users-one-day-usage-metrics.token';

export function provideCopilotCopilotUsersOneDayUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotUsersOneDayUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_USERS_ONE_DAY_USAGE_METRICS,
    'COPILOT_COPILOT_USERS_ONE_DAY_USAGE_METRICS',
    initialBehavior,
  );
}
