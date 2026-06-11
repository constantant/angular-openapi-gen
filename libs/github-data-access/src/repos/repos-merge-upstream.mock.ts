import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_MERGE_UPSTREAM } from './repos-merge-upstream.token';
import type { ReposMergeUpstreamResponse } from './repos-merge-upstream.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/merge-upstream',
  path: '/repos/{owner}/{repo}/merge-upstream',
  method: 'post',
  tag: 'repos',
};

export function provideReposMergeUpstreamMock(
  initialBehavior?: ProviderInitialBehavior<ReposMergeUpstreamResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_MERGE_UPSTREAM,
    'REPOS_MERGE_UPSTREAM',
    initialBehavior,
    _meta,
  );
}
