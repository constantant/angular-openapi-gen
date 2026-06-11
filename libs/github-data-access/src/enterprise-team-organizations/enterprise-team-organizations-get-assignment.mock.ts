import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENT } from './enterprise-team-organizations-get-assignment.token';
import type { EnterpriseTeamOrganizationsGetAssignmentResponse } from './enterprise-team-organizations-get-assignment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-organizations/get-assignment',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}',
  method: 'get',
  tag: 'enterprise-team-organizations',
};

export function provideEnterpriseTeamOrganizationsGetAssignmentMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamOrganizationsGetAssignmentResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENT,
    'ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENT',
    initialBehavior,
    _meta,
  );
}
