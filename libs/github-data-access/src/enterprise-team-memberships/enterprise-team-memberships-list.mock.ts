import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_LIST } from './enterprise-team-memberships-list.token';
import type { EnterpriseTeamMembershipsListResponse } from './enterprise-team-memberships-list.token';

export function provideEnterpriseTeamMembershipsListMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamMembershipsListResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_LIST,
    'ENTERPRISE_TEAM_MEMBERSHIPS_LIST',
    initialBehavior,
  );
}
