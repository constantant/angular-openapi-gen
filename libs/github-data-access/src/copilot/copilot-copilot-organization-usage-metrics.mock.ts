import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ORGANIZATION_USAGE_METRICS } from './copilot-copilot-organization-usage-metrics.token';
import type { CopilotCopilotOrganizationUsageMetricsResponse } from './copilot-copilot-organization-usage-metrics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/copilot-organization-usage-metrics',
  path: '/orgs/{org}/copilot/metrics/reports/organization-28-day/latest',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotCopilotOrganizationUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotOrganizationUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ORGANIZATION_USAGE_METRICS,
    'COPILOT_COPILOT_ORGANIZATION_USAGE_METRICS',
    initialBehavior,
    _meta,
  );
}
