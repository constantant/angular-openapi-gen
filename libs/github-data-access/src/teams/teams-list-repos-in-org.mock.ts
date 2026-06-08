import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_REPOS_IN_ORG } from './teams-list-repos-in-org.token';
import type { TeamsListReposInOrgResponse } from './teams-list-repos-in-org.token';

export function provideTeamsListReposInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListReposInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_REPOS_IN_ORG,
    'TEAMS_LIST_REPOS_IN_ORG',
    initialBehavior,
  );
}
