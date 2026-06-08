import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY } from './repos-delete-deployment-branch-policy.token';

export function provideReposDeleteDeploymentBranchPolicyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY,
    'REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY',
    initialBehavior,
  );
}
