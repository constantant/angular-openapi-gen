import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENTS } from './enterprise-team-organizations-get-assignments.token';
import type { EnterpriseTeamOrganizationsGetAssignmentsResponse } from './enterprise-team-organizations-get-assignments.token';

export function provideEnterpriseTeamOrganizationsGetAssignmentsMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamOrganizationsGetAssignmentsResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENTS,
    'ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENTS',
    initialBehavior,
  );
}
