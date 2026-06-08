import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ORGANIZATION_ONE_DAY_USAGE_METRICS } from './copilot-copilot-organization-one-day-usage-metrics.token';
import type { CopilotCopilotOrganizationOneDayUsageMetricsResponse } from './copilot-copilot-organization-one-day-usage-metrics.token';

export function provideCopilotCopilotOrganizationOneDayUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotOrganizationOneDayUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ORGANIZATION_ONE_DAY_USAGE_METRICS,
    'COPILOT_COPILOT_ORGANIZATION_ONE_DAY_USAGE_METRICS',
    initialBehavior,
  );
}
