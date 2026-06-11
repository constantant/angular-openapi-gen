import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_COMMITS } from './repos-list-commits.token';
import type { ReposListCommitsResponse } from './repos-list-commits.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-commits',
  path: '/repos/{owner}/{repo}/commits',
  method: 'get',
  tag: 'repos',
};

export function provideReposListCommitsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListCommitsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_COMMITS,
    'REPOS_LIST_COMMITS',
    initialBehavior,
    _meta,
  );
}
