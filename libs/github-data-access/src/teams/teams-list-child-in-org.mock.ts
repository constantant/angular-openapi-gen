import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_CHILD_IN_ORG } from './teams-list-child-in-org.token';
import type { TeamsListChildInOrgResponse } from './teams-list-child-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/list-child-in-org',
  path: '/orgs/{org}/teams/{team_slug}/teams',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsListChildInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListChildInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_CHILD_IN_ORG,
    'TEAMS_LIST_CHILD_IN_ORG',
    initialBehavior,
    _meta,
  );
}
