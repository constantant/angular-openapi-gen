import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetPunchCardStats,
  type ReposGetPunchCardStatsResponse,
} from './repos-get-punch-card-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-punch-card-stats',
  path: '/repos/{owner}/{repo}/stats/punch_card',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_PUNCH_CARD_STATS_MOCK: MockEndpoint<ReposGetPunchCardStatsResponse> =
  {
    key: 'REPOS_GET_PUNCH_CARD_STATS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetPunchCardStats,
  };

export function provideReposGetPunchCardStatsMock(
  initialBehavior?: MockEndpointBehavior<ReposGetPunchCardStatsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_PUNCH_CARD_STATS_MOCK, initialBehavior);
}
