import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_BRANCH } from './repos-get-branch.token';
import type { ReposGetBranchResponse } from './repos-get-branch.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-branch',
  path: '/repos/{owner}/{repo}/branches/{branch}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetBranchMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetBranchResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_BRANCH,
    'REPOS_GET_BRANCH',
    initialBehavior,
    _meta,
  );
}
