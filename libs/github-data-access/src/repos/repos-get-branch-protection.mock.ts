import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_BRANCH_PROTECTION } from './repos-get-branch-protection.token';
import type { ReposGetBranchProtectionResponse } from './repos-get-branch-protection.token';

export function provideReposGetBranchProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetBranchProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_BRANCH_PROTECTION,
    'REPOS_GET_BRANCH_PROTECTION',
    initialBehavior,
  );
}
