import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ORG_ROLE_USERS } from './orgs-list-org-role-users.token';
import type { OrgsListOrgRoleUsersResponse } from './orgs-list-org-role-users.token';

export function provideOrgsListOrgRoleUsersMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListOrgRoleUsersResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ORG_ROLE_USERS,
    'ORGS_LIST_ORG_ROLE_USERS',
    initialBehavior,
  );
}
