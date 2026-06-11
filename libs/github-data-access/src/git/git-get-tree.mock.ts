import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_GET_TREE } from './git-get-tree.token';
import type { GitGetTreeResponse } from './git-get-tree.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/get-tree',
  path: '/repos/{owner}/{repo}/git/trees/{tree_sha}',
  method: 'get',
  tag: 'git',
};

export function provideGitGetTreeMock(
  initialBehavior?: ProviderInitialBehavior<GitGetTreeResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_GET_TREE,
    'GIT_GET_TREE',
    initialBehavior,
    _meta,
  );
}
