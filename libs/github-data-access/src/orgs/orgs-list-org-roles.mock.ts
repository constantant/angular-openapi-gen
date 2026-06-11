import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ORG_ROLES } from './orgs-list-org-roles.token';
import type { OrgsListOrgRolesResponse } from './orgs-list-org-roles.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-org-roles',
  path: '/orgs/{org}/organization-roles',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListOrgRolesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListOrgRolesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ORG_ROLES,
    'ORGS_LIST_ORG_ROLES',
    initialBehavior,
    _meta,
  );
}
