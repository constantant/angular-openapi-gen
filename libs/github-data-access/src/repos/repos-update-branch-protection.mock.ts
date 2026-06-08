import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_BRANCH_PROTECTION } from './repos-update-branch-protection.token';
import type { ReposUpdateBranchProtectionResponse } from './repos-update-branch-protection.token';

export function provideReposUpdateBranchProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateBranchProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_BRANCH_PROTECTION,
    'REPOS_UPDATE_BRANCH_PROTECTION',
    initialBehavior,
  );
}
