import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_MERGE } from './repos-merge.token';
import type { ReposMergeResponse } from './repos-merge.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/merge',
  path: '/repos/{owner}/{repo}/merges',
  method: 'post',
  tag: 'repos',
};

export function provideReposMergeMock(
  initialBehavior?: ProviderInitialBehavior<ReposMergeResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REPOS_MERGE,
    'REPOS_MERGE',
    initialBehavior,
    _meta,
    options,
  );
}
