import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_TEAMS_WITH_ACCESS_TO_PROTECTED_BRANCH } from './repos-get-teams-with-access-to-protected-branch.token';
import type { ReposGetTeamsWithAccessToProtectedBranchResponse } from './repos-get-teams-with-access-to-protected-branch.token';

export function provideReposGetTeamsWithAccessToProtectedBranchMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetTeamsWithAccessToProtectedBranchResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_TEAMS_WITH_ACCESS_TO_PROTECTED_BRANCH,
    'REPOS_GET_TEAMS_WITH_ACCESS_TO_PROTECTED_BRANCH',
    initialBehavior,
  );
}
