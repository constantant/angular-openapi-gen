import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ORGANIZATION_USERS_USAGE_METRICS } from './copilot-copilot-organization-users-usage-metrics.token';
import type { CopilotCopilotOrganizationUsersUsageMetricsResponse } from './copilot-copilot-organization-users-usage-metrics.token';

export function provideCopilotCopilotOrganizationUsersUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotOrganizationUsersUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ORGANIZATION_USERS_USAGE_METRICS,
    'COPILOT_COPILOT_ORGANIZATION_USERS_USAGE_METRICS',
    initialBehavior,
  );
}
