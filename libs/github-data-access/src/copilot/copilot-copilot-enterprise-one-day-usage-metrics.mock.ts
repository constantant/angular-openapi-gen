import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ENTERPRISE_ONE_DAY_USAGE_METRICS } from './copilot-copilot-enterprise-one-day-usage-metrics.token';
import type { CopilotCopilotEnterpriseOneDayUsageMetricsResponse } from './copilot-copilot-enterprise-one-day-usage-metrics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/copilot-enterprise-one-day-usage-metrics',
  path: '/enterprises/{enterprise}/copilot/metrics/reports/enterprise-1-day',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotCopilotEnterpriseOneDayUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotEnterpriseOneDayUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ENTERPRISE_ONE_DAY_USAGE_METRICS,
    'COPILOT_COPILOT_ENTERPRISE_ONE_DAY_USAGE_METRICS',
    initialBehavior,
    _meta,
  );
}
