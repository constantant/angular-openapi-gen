import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_GET_COMMIT } from './git-get-commit.token';
import type { GitGetCommitResponse } from './git-get-commit.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/get-commit',
  path: '/repos/{owner}/{repo}/git/commits/{commit_sha}',
  method: 'get',
  tag: 'git',
};

export function provideGitGetCommitMock(
  initialBehavior?: ProviderInitialBehavior<GitGetCommitResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_GET_COMMIT,
    'GIT_GET_COMMIT',
    initialBehavior,
    _meta,
  );
}
