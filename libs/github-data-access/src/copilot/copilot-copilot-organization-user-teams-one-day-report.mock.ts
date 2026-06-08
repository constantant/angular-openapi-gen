import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ORGANIZATION_USER_TEAMS_ONE_DAY_REPORT } from './copilot-copilot-organization-user-teams-one-day-report.token';
import type { CopilotCopilotOrganizationUserTeamsOneDayReportResponse } from './copilot-copilot-organization-user-teams-one-day-report.token';

export function provideCopilotCopilotOrganizationUserTeamsOneDayReportMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotOrganizationUserTeamsOneDayReportResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ORGANIZATION_USER_TEAMS_ONE_DAY_REPORT,
    'COPILOT_COPILOT_ORGANIZATION_USER_TEAMS_ONE_DAY_REPORT',
    initialBehavior,
  );
}
