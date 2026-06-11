import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ORGANIZATION_ONE_DAY_USAGE_METRICS } from './copilot-copilot-organization-one-day-usage-metrics.token';
import type { CopilotCopilotOrganizationOneDayUsageMetricsResponse } from './copilot-copilot-organization-one-day-usage-metrics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/copilot-organization-one-day-usage-metrics',
  path: '/orgs/{org}/copilot/metrics/reports/organization-1-day',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotCopilotOrganizationOneDayUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotOrganizationOneDayUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ORGANIZATION_ONE_DAY_USAGE_METRICS,
    'COPILOT_COPILOT_ORGANIZATION_ONE_DAY_USAGE_METRICS',
    initialBehavior,
    _meta,
  );
}
