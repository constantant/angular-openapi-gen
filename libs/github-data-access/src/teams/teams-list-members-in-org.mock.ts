import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_MEMBERS_IN_ORG } from './teams-list-members-in-org.token';
import type { TeamsListMembersInOrgResponse } from './teams-list-members-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/list-members-in-org',
  path: '/orgs/{org}/teams/{team_slug}/members',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsListMembersInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListMembersInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_MEMBERS_IN_ORG,
    'TEAMS_LIST_MEMBERS_IN_ORG',
    initialBehavior,
    _meta,
  );
}
