import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetParticipationStats,
  type ReposGetParticipationStatsResponse,
} from './repos-get-participation-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-participation-stats',
  path: '/repos/{owner}/{repo}/stats/participation',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_PARTICIPATION_STATS_MOCK: MockEndpoint<ReposGetParticipationStatsResponse> =
  {
    key: 'REPOS_GET_PARTICIPATION_STATS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetParticipationStats,
  };

export function provideReposGetParticipationStatsMock(
  initialBehavior?: MockEndpointBehavior<ReposGetParticipationStatsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_PARTICIPATION_STATS_MOCK,
    initialBehavior,
  );
}
