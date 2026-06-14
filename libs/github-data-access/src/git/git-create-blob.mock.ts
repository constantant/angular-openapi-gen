import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_CREATE_BLOB } from './git-create-blob.token';
import type { GitCreateBlobResponse } from './git-create-blob.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/create-blob',
  path: '/repos/{owner}/{repo}/git/blobs',
  method: 'post',
  tag: 'git',
};

export function provideGitCreateBlobMock(
  initialBehavior?: ProviderInitialBehavior<GitCreateBlobResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    GIT_CREATE_BLOB,
    'GIT_CREATE_BLOB',
    initialBehavior,
    _meta,
    options,
  );
}
