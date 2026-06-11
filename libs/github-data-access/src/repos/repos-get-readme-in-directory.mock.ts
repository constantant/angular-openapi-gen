import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_README_IN_DIRECTORY } from './repos-get-readme-in-directory.token';
import type { ReposGetReadmeInDirectoryResponse } from './repos-get-readme-in-directory.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-readme-in-directory',
  path: '/repos/{owner}/{repo}/readme/{dir}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetReadmeInDirectoryMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetReadmeInDirectoryResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_README_IN_DIRECTORY,
    'REPOS_GET_README_IN_DIRECTORY',
    initialBehavior,
    _meta,
  );
}
