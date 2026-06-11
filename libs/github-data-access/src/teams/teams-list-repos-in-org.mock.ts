import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_REPOS_IN_ORG } from './teams-list-repos-in-org.token';
import type { TeamsListReposInOrgResponse } from './teams-list-repos-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/list-repos-in-org',
  path: '/orgs/{org}/teams/{team_slug}/repos',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsListReposInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListReposInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_REPOS_IN_ORG,
    'TEAMS_LIST_REPOS_IN_ORG',
    initialBehavior,
    _meta,
  );
}
