import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_PARTICIPATION_STATS } from './repos-get-participation-stats.token';
import type { ReposGetParticipationStatsResponse } from './repos-get-participation-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-participation-stats',
  path: '/repos/{owner}/{repo}/stats/participation',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetParticipationStatsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetParticipationStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_PARTICIPATION_STATS,
    'REPOS_GET_PARTICIPATION_STATS',
    initialBehavior,
    _meta,
  );
}
