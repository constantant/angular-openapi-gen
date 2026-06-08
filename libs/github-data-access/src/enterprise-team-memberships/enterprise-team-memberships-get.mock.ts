import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_GET } from './enterprise-team-memberships-get.token';
import type { EnterpriseTeamMembershipsGetResponse } from './enterprise-team-memberships-get.token';

export function provideEnterpriseTeamMembershipsGetMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamMembershipsGetResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_GET,
    'ENTERPRISE_TEAM_MEMBERSHIPS_GET',
    initialBehavior,
  );
}
