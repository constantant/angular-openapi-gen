import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_ENTERPRISE_USER_TEAMS_ONE_DAY_REPORT } from './copilot-copilot-enterprise-user-teams-one-day-report.token';
import type { CopilotCopilotEnterpriseUserTeamsOneDayReportResponse } from './copilot-copilot-enterprise-user-teams-one-day-report.token';

export function provideCopilotCopilotEnterpriseUserTeamsOneDayReportMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotEnterpriseUserTeamsOneDayReportResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_ENTERPRISE_USER_TEAMS_ONE_DAY_REPORT,
    'COPILOT_COPILOT_ENTERPRISE_USER_TEAMS_ONE_DAY_REPORT',
    initialBehavior,
  );
}
