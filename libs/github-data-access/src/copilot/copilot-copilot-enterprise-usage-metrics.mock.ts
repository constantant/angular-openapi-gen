import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ENTERPRISE_USAGE_METRICS } from './copilot-copilot-enterprise-usage-metrics.token';
import type { CopilotCopilotEnterpriseUsageMetricsResponse } from './copilot-copilot-enterprise-usage-metrics.token';

export function provideCopilotCopilotEnterpriseUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotEnterpriseUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ENTERPRISE_USAGE_METRICS,
    'COPILOT_COPILOT_ENTERPRISE_USAGE_METRICS',
    initialBehavior,
  );
}
