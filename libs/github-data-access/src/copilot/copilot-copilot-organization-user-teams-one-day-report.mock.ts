import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ORGANIZATION_USER_TEAMS_ONE_DAY_REPORT } from './copilot-copilot-organization-user-teams-one-day-report.token';
import type { CopilotCopilotOrganizationUserTeamsOneDayReportResponse } from './copilot-copilot-organization-user-teams-one-day-report.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/copilot-organization-user-teams-one-day-report',
  path: '/orgs/{org}/copilot/metrics/reports/user-teams-1-day',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotCopilotOrganizationUserTeamsOneDayReportMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotOrganizationUserTeamsOneDayReportResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ORGANIZATION_USER_TEAMS_ONE_DAY_REPORT,
    'COPILOT_COPILOT_ORGANIZATION_USER_TEAMS_ONE_DAY_REPORT',
    initialBehavior,
    _meta,
  );
}
