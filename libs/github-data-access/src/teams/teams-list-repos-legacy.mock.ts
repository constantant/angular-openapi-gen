import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_REPOS_LEGACY } from './teams-list-repos-legacy.token';
import type { TeamsListReposLegacyResponse } from './teams-list-repos-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/list-repos-legacy',
  path: '/teams/{team_id}/repos',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsListReposLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListReposLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_REPOS_LEGACY,
    'TEAMS_LIST_REPOS_LEGACY',
    initialBehavior,
    _meta,
  );
}
