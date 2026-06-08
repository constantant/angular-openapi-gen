import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_ADD } from './enterprise-team-memberships-add.token';
import type { EnterpriseTeamMembershipsAddResponse } from './enterprise-team-memberships-add.token';

export function provideEnterpriseTeamMembershipsAddMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamMembershipsAddResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_ADD,
    'ENTERPRISE_TEAM_MEMBERSHIPS_ADD',
    initialBehavior,
  );
}
