import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_COMMIT_STATUS } from './repos-create-commit-status.token';
import type { ReposCreateCommitStatusResponse } from './repos-create-commit-status.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-commit-status',
  path: '/repos/{owner}/{repo}/statuses/{sha}',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateCommitStatusMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateCommitStatusResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_COMMIT_STATUS,
    'REPOS_CREATE_COMMIT_STATUS',
    initialBehavior,
    _meta,
  );
}
