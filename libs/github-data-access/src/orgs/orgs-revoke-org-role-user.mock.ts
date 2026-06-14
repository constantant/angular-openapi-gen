import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REVOKE_ORG_ROLE_USER } from './orgs-revoke-org-role-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/revoke-org-role-user',
  path: '/orgs/{org}/organization-roles/users/{username}/{role_id}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsRevokeOrgRoleUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVOKE_ORG_ROLE_USER,
    'ORGS_REVOKE_ORG_ROLE_USER',
    initialBehavior,
    _meta,
    options,
  );
}
