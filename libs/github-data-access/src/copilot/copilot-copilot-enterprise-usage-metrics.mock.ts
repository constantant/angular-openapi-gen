import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ENTERPRISE_USAGE_METRICS } from './copilot-copilot-enterprise-usage-metrics.token';
import type { CopilotCopilotEnterpriseUsageMetricsResponse } from './copilot-copilot-enterprise-usage-metrics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/copilot-enterprise-usage-metrics',
  path: '/enterprises/{enterprise}/copilot/metrics/reports/enterprise-28-day/latest',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotCopilotEnterpriseUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotEnterpriseUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ENTERPRISE_USAGE_METRICS,
    'COPILOT_COPILOT_ENTERPRISE_USAGE_METRICS',
    initialBehavior,
    _meta,
  );
}
