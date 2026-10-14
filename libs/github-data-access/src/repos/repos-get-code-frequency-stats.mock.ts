import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetCodeFrequencyStats,
  type ReposGetCodeFrequencyStatsResponse,
} from './repos-get-code-frequency-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-code-frequency-stats',
  path: '/repos/{owner}/{repo}/stats/code_frequency',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_CODE_FREQUENCY_STATS_MOCK: MockEndpoint<ReposGetCodeFrequencyStatsResponse> =
  {
    key: 'REPOS_GET_CODE_FREQUENCY_STATS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetCodeFrequencyStats,
  };

export function provideReposGetCodeFrequencyStatsMock(
  initialBehavior?: MockEndpointBehavior<ReposGetCodeFrequencyStatsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_CODE_FREQUENCY_STATS_MOCK,
    initialBehavior,
  );
}
