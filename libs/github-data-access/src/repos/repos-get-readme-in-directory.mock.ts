import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_README_IN_DIRECTORY } from './repos-get-readme-in-directory.token';
import type { ReposGetReadmeInDirectoryResponse } from './repos-get-readme-in-directory.token';

export function provideReposGetReadmeInDirectoryMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetReadmeInDirectoryResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_README_IN_DIRECTORY,
    'REPOS_GET_README_IN_DIRECTORY',
    initialBehavior,
  );
}
