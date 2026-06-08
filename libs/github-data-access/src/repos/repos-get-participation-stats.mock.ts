import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_PARTICIPATION_STATS } from './repos-get-participation-stats.token';
import type { ReposGetParticipationStatsResponse } from './repos-get-participation-stats.token';

export function provideReposGetParticipationStatsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetParticipationStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_PARTICIPATION_STATS,
    'REPOS_GET_PARTICIPATION_STATS',
    initialBehavior,
  );
}
