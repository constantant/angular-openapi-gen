import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REVOKE_ALL_ORG_ROLES_USER } from './orgs-revoke-all-org-roles-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/revoke-all-org-roles-user',
  path: '/orgs/{org}/organization-roles/users/{username}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsRevokeAllOrgRolesUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVOKE_ALL_ORG_ROLES_USER,
    'ORGS_REVOKE_ALL_ORG_ROLES_USER',
    initialBehavior,
    _meta,
  );
}
