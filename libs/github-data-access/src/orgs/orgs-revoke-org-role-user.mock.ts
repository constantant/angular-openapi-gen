import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REVOKE_ORG_ROLE_USER } from './orgs-revoke-org-role-user.token';

export function provideOrgsRevokeOrgRoleUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVOKE_ORG_ROLE_USER,
    'ORGS_REVOKE_ORG_ROLE_USER',
    initialBehavior,
  );
}
