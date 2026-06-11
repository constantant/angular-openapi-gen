import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ORGANIZATION_USERS_USAGE_METRICS } from './copilot-copilot-organization-users-usage-metrics.token';
import type { CopilotCopilotOrganizationUsersUsageMetricsResponse } from './copilot-copilot-organization-users-usage-metrics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/copilot-organization-users-usage-metrics',
  path: '/orgs/{org}/copilot/metrics/reports/users-28-day/latest',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotCopilotOrganizationUsersUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotOrganizationUsersUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ORGANIZATION_USERS_USAGE_METRICS,
    'COPILOT_COPILOT_ORGANIZATION_USERS_USAGE_METRICS',
    initialBehavior,
    _meta,
  );
}
