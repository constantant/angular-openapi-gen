import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_DEPLOYMENT_BRANCH_POLICY } from './repos-get-deployment-branch-policy.token';
import type { ReposGetDeploymentBranchPolicyResponse } from './repos-get-deployment-branch-policy.token';

export function provideReposGetDeploymentBranchPolicyMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetDeploymentBranchPolicyResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_DEPLOYMENT_BRANCH_POLICY,
    'REPOS_GET_DEPLOYMENT_BRANCH_POLICY',
    initialBehavior,
  );
}
