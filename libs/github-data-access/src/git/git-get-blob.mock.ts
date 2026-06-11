import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_GET_BLOB } from './git-get-blob.token';
import type { GitGetBlobResponse } from './git-get-blob.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/get-blob',
  path: '/repos/{owner}/{repo}/git/blobs/{file_sha}',
  method: 'get',
  tag: 'git',
};

export function provideGitGetBlobMock(
  initialBehavior?: ProviderInitialBehavior<GitGetBlobResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_GET_BLOB,
    'GIT_GET_BLOB',
    initialBehavior,
    _meta,
  );
}
