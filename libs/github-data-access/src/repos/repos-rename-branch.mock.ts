import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_RENAME_BRANCH } from './repos-rename-branch.token';
import type { ReposRenameBranchResponse } from './repos-rename-branch.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/rename-branch',
  path: '/repos/{owner}/{repo}/branches/{branch}/rename',
  method: 'post',
  tag: 'repos',
};

export function provideReposRenameBranchMock(
  initialBehavior?: ProviderInitialBehavior<ReposRenameBranchResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_RENAME_BRANCH,
    'REPOS_RENAME_BRANCH',
    initialBehavior,
    _meta,
  );
}
