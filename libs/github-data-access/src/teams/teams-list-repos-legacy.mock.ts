import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_REPOS_LEGACY } from './teams-list-repos-legacy.token';
import type { TeamsListReposLegacyResponse } from './teams-list-repos-legacy.token';

export function provideTeamsListReposLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListReposLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_REPOS_LEGACY,
    'TEAMS_LIST_REPOS_LEGACY',
    initialBehavior,
  );
}
