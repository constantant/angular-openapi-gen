import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES } from './repos-list-deployment-branch-policies.token';
import type { ReposListDeploymentBranchPoliciesResponse } from './repos-list-deployment-branch-policies.token';

export function provideReposListDeploymentBranchPoliciesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListDeploymentBranchPoliciesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES,
    'REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES',
    initialBehavior,
  );
}
