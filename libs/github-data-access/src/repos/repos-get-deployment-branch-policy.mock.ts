import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_DEPLOYMENT_BRANCH_POLICY } from './repos-get-deployment-branch-policy.token';
import type { ReposGetDeploymentBranchPolicyResponse } from './repos-get-deployment-branch-policy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-deployment-branch-policy',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetDeploymentBranchPolicyMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetDeploymentBranchPolicyResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_DEPLOYMENT_BRANCH_POLICY,
    'REPOS_GET_DEPLOYMENT_BRANCH_POLICY',
    initialBehavior,
    _meta,
  );
}
