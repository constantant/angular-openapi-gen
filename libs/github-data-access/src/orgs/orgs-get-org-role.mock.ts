import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_GET_ORG_ROLE } from './orgs-get-org-role.token';
import type { OrgsGetOrgRoleResponse } from './orgs-get-org-role.token';

export function provideOrgsGetOrgRoleMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetOrgRoleResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_ORG_ROLE,
    'ORGS_GET_ORG_ROLE',
    initialBehavior,
  );
}
