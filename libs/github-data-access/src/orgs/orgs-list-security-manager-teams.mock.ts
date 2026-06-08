import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_SECURITY_MANAGER_TEAMS } from './orgs-list-security-manager-teams.token';
import type { OrgsListSecurityManagerTeamsResponse } from './orgs-list-security-manager-teams.token';

export function provideOrgsListSecurityManagerTeamsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListSecurityManagerTeamsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_SECURITY_MANAGER_TEAMS,
    'ORGS_LIST_SECURITY_MANAGER_TEAMS',
    initialBehavior,
  );
}
