import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_BRANCH } from './repos-get-branch.token';
import type { ReposGetBranchResponse } from './repos-get-branch.token';

export function provideReposGetBranchMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetBranchResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_BRANCH,
    'REPOS_GET_BRANCH',
    initialBehavior,
  );
}
