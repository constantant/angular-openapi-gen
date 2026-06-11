import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_COMMIT } from './repos-get-commit.token';
import type { ReposGetCommitResponse } from './repos-get-commit.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-commit',
  path: '/repos/{owner}/{repo}/commits/{ref}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetCommitMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCommitResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_COMMIT,
    'REPOS_GET_COMMIT',
    initialBehavior,
    _meta,
  );
}
