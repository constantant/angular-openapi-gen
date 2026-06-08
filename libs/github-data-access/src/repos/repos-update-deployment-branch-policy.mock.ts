import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY } from './repos-update-deployment-branch-policy.token';
import type { ReposUpdateDeploymentBranchPolicyResponse } from './repos-update-deployment-branch-policy.token';

export function provideReposUpdateDeploymentBranchPolicyMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateDeploymentBranchPolicyResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY,
    'REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY',
    initialBehavior,
  );
}
