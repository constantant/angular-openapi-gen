import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_ASSIGN_USER_TO_ORG_ROLE } from './orgs-assign-user-to-org-role.token';

export function provideOrgsAssignUserToOrgRoleMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_ASSIGN_USER_TO_ORG_ROLE,
    'ORGS_ASSIGN_USER_TO_ORG_ROLE',
    initialBehavior,
  );
}
