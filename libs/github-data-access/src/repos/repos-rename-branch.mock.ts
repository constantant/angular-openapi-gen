import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_RENAME_BRANCH } from './repos-rename-branch.token';
import type { ReposRenameBranchResponse } from './repos-rename-branch.token';

export function provideReposRenameBranchMock(
  initialBehavior?: ProviderInitialBehavior<ReposRenameBranchResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_RENAME_BRANCH,
    'REPOS_RENAME_BRANCH',
    initialBehavior,
  );
}
