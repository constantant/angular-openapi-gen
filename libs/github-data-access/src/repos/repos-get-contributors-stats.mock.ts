import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetContributorsStats,
  type ReposGetContributorsStatsResponse,
} from './repos-get-contributors-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-contributors-stats',
  path: '/repos/{owner}/{repo}/stats/contributors',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_CONTRIBUTORS_STATS_MOCK: MockEndpoint<ReposGetContributorsStatsResponse> =
  {
    key: 'REPOS_GET_CONTRIBUTORS_STATS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetContributorsStats,
  };

export function provideReposGetContributorsStatsMock(
  initialBehavior?: MockEndpointBehavior<ReposGetContributorsStatsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_CONTRIBUTORS_STATS_MOCK,
    initialBehavior,
  );
}
