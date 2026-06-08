import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_CONTRIBUTORS_STATS } from './repos-get-contributors-stats.token';
import type { ReposGetContributorsStatsResponse } from './repos-get-contributors-stats.token';

export function provideReposGetContributorsStatsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetContributorsStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_CONTRIBUTORS_STATS,
    'REPOS_GET_CONTRIBUTORS_STATS',
    initialBehavior,
  );
}
