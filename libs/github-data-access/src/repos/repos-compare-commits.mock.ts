import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_COMPARE_COMMITS } from './repos-compare-commits.token';
import type { ReposCompareCommitsResponse } from './repos-compare-commits.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/compare-commits',
  path: '/repos/{owner}/{repo}/compare/{basehead}',
  method: 'get',
  tag: 'repos',
};

export function provideReposCompareCommitsMock(
  initialBehavior?: ProviderInitialBehavior<ReposCompareCommitsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_COMPARE_COMMITS,
    'REPOS_COMPARE_COMMITS',
    initialBehavior,
    _meta,
  );
}
