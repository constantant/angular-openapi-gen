import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REVOKE_ORG_ROLE_TEAM } from './orgs-revoke-org-role-team.token';

export function provideOrgsRevokeOrgRoleTeamMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVOKE_ORG_ROLE_TEAM,
    'ORGS_REVOKE_ORG_ROLE_TEAM',
    initialBehavior,
  );
}
