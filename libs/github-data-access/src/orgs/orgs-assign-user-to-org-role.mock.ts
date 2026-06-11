import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_ASSIGN_USER_TO_ORG_ROLE } from './orgs-assign-user-to-org-role.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/assign-user-to-org-role',
  path: '/orgs/{org}/organization-roles/users/{username}/{role_id}',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsAssignUserToOrgRoleMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_ASSIGN_USER_TO_ORG_ROLE,
    'ORGS_ASSIGN_USER_TO_ORG_ROLE',
    initialBehavior,
    _meta,
  );
}
