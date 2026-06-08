import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENT } from './enterprise-team-organizations-get-assignment.token';
import type { EnterpriseTeamOrganizationsGetAssignmentResponse } from './enterprise-team-organizations-get-assignment.token';

export function provideEnterpriseTeamOrganizationsGetAssignmentMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamOrganizationsGetAssignmentResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENT,
    'ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENT',
    initialBehavior,
  );
}
