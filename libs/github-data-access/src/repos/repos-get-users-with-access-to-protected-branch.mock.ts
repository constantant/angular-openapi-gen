import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_USERS_WITH_ACCESS_TO_PROTECTED_BRANCH } from './repos-get-users-with-access-to-protected-branch.token';
import type { ReposGetUsersWithAccessToProtectedBranchResponse } from './repos-get-users-with-access-to-protected-branch.token';

export function provideReposGetUsersWithAccessToProtectedBranchMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetUsersWithAccessToProtectedBranchResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_USERS_WITH_ACCESS_TO_PROTECTED_BRANCH,
    'REPOS_GET_USERS_WITH_ACCESS_TO_PROTECTED_BRANCH',
    initialBehavior,
  );
}
