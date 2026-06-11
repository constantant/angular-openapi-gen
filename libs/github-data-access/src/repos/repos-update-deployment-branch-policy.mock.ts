import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY } from './repos-update-deployment-branch-policy.token';
import type { ReposUpdateDeploymentBranchPolicyResponse } from './repos-update-deployment-branch-policy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-deployment-branch-policy',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}',
  method: 'put',
  tag: 'repos',
};

export function provideReposUpdateDeploymentBranchPolicyMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateDeploymentBranchPolicyResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY,
    'REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY',
    initialBehavior,
    _meta,
  );
}
