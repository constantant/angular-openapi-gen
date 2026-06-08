import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REVOKE_ALL_ORG_ROLES_TEAM } from './orgs-revoke-all-org-roles-team.token';

export function provideOrgsRevokeAllOrgRolesTeamMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVOKE_ALL_ORG_ROLES_TEAM,
    'ORGS_REVOKE_ALL_ORG_ROLES_TEAM',
    initialBehavior,
  );
}
