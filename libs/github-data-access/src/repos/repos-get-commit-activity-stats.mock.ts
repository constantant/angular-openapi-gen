import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetCommitActivityStats,
  type ReposGetCommitActivityStatsResponse,
} from './repos-get-commit-activity-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-commit-activity-stats',
  path: '/repos/{owner}/{repo}/stats/commit_activity',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_COMMIT_ACTIVITY_STATS_MOCK: MockEndpoint<ReposGetCommitActivityStatsResponse> =
  {
    key: 'REPOS_GET_COMMIT_ACTIVITY_STATS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetCommitActivityStats,
  };

export function provideReposGetCommitActivityStatsMock(
  initialBehavior?: MockEndpointBehavior<ReposGetCommitActivityStatsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_COMMIT_ACTIVITY_STATS_MOCK,
    initialBehavior,
  );
}
