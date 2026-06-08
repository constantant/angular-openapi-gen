import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_BRANCHES_FOR_HEAD_COMMIT } from './repos-list-branches-for-head-commit.token';
import type { ReposListBranchesForHeadCommitResponse } from './repos-list-branches-for-head-commit.token';

export function provideReposListBranchesForHeadCommitMock(
  initialBehavior?: ProviderInitialBehavior<ReposListBranchesForHeadCommitResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_BRANCHES_FOR_HEAD_COMMIT,
    'REPOS_LIST_BRANCHES_FOR_HEAD_COMMIT',
    initialBehavior,
  );
}
