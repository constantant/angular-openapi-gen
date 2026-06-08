import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_REMOVE } from './enterprise-team-memberships-remove.token';

export function provideEnterpriseTeamMembershipsRemoveMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_REMOVE,
    'ENTERPRISE_TEAM_MEMBERSHIPS_REMOVE',
    initialBehavior,
  );
}
