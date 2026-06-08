import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_APPS_WITH_ACCESS_TO_PROTECTED_BRANCH } from './repos-get-apps-with-access-to-protected-branch.token';
import type { ReposGetAppsWithAccessToProtectedBranchResponse } from './repos-get-apps-with-access-to-protected-branch.token';

export function provideReposGetAppsWithAccessToProtectedBranchMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAppsWithAccessToProtectedBranchResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_APPS_WITH_ACCESS_TO_PROTECTED_BRANCH,
    'REPOS_GET_APPS_WITH_ACCESS_TO_PROTECTED_BRANCH',
    initialBehavior,
  );
}
