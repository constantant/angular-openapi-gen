import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REVOKE_ALL_ORG_ROLES_TEAM } from './orgs-revoke-all-org-roles-team.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/revoke-all-org-roles-team',
  path: '/orgs/{org}/organization-roles/teams/{team_slug}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsRevokeAllOrgRolesTeamMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVOKE_ALL_ORG_ROLES_TEAM,
    'ORGS_REVOKE_ALL_ORG_ROLES_TEAM',
    initialBehavior,
    _meta,
  );
}
