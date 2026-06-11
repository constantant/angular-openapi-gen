import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REVOKE_ORG_ROLE_TEAM } from './orgs-revoke-org-role-team.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/revoke-org-role-team',
  path: '/orgs/{org}/organization-roles/teams/{team_slug}/{role_id}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsRevokeOrgRoleTeamMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVOKE_ORG_ROLE_TEAM,
    'ORGS_REVOKE_ORG_ROLE_TEAM',
    initialBehavior,
    _meta,
  );
}
