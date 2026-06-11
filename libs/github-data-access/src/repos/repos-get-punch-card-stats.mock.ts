import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_PUNCH_CARD_STATS } from './repos-get-punch-card-stats.token';
import type { ReposGetPunchCardStatsResponse } from './repos-get-punch-card-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-punch-card-stats',
  path: '/repos/{owner}/{repo}/stats/punch_card',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetPunchCardStatsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetPunchCardStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_PUNCH_CARD_STATS,
    'REPOS_GET_PUNCH_CARD_STATS',
    initialBehavior,
    _meta,
  );
}
