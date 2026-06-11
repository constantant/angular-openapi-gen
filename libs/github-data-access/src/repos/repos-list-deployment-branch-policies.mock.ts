import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES } from './repos-list-deployment-branch-policies.token';
import type { ReposListDeploymentBranchPoliciesResponse } from './repos-list-deployment-branch-policies.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-deployment-branch-policies',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies',
  method: 'get',
  tag: 'repos',
};

export function provideReposListDeploymentBranchPoliciesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListDeploymentBranchPoliciesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES,
    'REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES',
    initialBehavior,
    _meta,
  );
}
