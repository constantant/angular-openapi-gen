import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_BRANCHES } from './repos-list-branches.token';
import type { ReposListBranchesResponse } from './repos-list-branches.token';

export function provideReposListBranchesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListBranchesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_BRANCHES,
    'REPOS_LIST_BRANCHES',
    initialBehavior,
  );
}
