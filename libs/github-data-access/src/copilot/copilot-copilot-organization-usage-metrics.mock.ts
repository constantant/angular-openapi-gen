import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ORGANIZATION_USAGE_METRICS } from './copilot-copilot-organization-usage-metrics.token';
import type { CopilotCopilotOrganizationUsageMetricsResponse } from './copilot-copilot-organization-usage-metrics.token';

export function provideCopilotCopilotOrganizationUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotOrganizationUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ORGANIZATION_USAGE_METRICS,
    'COPILOT_COPILOT_ORGANIZATION_USAGE_METRICS',
    initialBehavior,
  );
}
