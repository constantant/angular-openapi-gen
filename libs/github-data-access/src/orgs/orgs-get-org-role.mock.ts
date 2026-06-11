import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_GET_ORG_ROLE } from './orgs-get-org-role.token';
import type { OrgsGetOrgRoleResponse } from './orgs-get-org-role.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/get-org-role',
  path: '/orgs/{org}/organization-roles/{role_id}',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsGetOrgRoleMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetOrgRoleResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_ORG_ROLE,
    'ORGS_GET_ORG_ROLE',
    initialBehavior,
    _meta,
  );
}
