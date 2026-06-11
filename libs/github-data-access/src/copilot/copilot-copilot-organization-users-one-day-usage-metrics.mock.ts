import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ORGANIZATION_USERS_ONE_DAY_USAGE_METRICS } from './copilot-copilot-organization-users-one-day-usage-metrics.token';
import type { CopilotCopilotOrganizationUsersOneDayUsageMetricsResponse } from './copilot-copilot-organization-users-one-day-usage-metrics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/copilot-organization-users-one-day-usage-metrics',
  path: '/orgs/{org}/copilot/metrics/reports/users-1-day',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotCopilotOrganizationUsersOneDayUsageMetricsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotOrganizationUsersOneDayUsageMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ORGANIZATION_USERS_ONE_DAY_USAGE_METRICS,
    'COPILOT_COPILOT_ORGANIZATION_USERS_ONE_DAY_USAGE_METRICS',
    initialBehavior,
    _meta,
  );
}
