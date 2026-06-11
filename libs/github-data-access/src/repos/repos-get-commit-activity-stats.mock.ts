import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_COMMIT_ACTIVITY_STATS } from './repos-get-commit-activity-stats.token';
import type { ReposGetCommitActivityStatsResponse } from './repos-get-commit-activity-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-commit-activity-stats',
  path: '/repos/{owner}/{repo}/stats/commit_activity',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetCommitActivityStatsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCommitActivityStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_COMMIT_ACTIVITY_STATS,
    'REPOS_GET_COMMIT_ACTIVITY_STATS',
    initialBehavior,
    _meta,
  );
}
