import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ORG_ROLE_TEAMS } from './orgs-list-org-role-teams.token';
import type { OrgsListOrgRoleTeamsResponse } from './orgs-list-org-role-teams.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-org-role-teams',
  path: '/orgs/{org}/organization-roles/{role_id}/teams',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListOrgRoleTeamsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListOrgRoleTeamsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ORG_ROLE_TEAMS,
    'ORGS_LIST_ORG_ROLE_TEAMS',
    initialBehavior,
    _meta,
  );
}
