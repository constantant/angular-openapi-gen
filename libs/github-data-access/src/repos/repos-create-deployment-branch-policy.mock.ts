import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_DEPLOYMENT_BRANCH_POLICY } from './repos-create-deployment-branch-policy.token';
import type { ReposCreateDeploymentBranchPolicyResponse } from './repos-create-deployment-branch-policy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-deployment-branch-policy',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateDeploymentBranchPolicyMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateDeploymentBranchPolicyResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_DEPLOYMENT_BRANCH_POLICY,
    'REPOS_CREATE_DEPLOYMENT_BRANCH_POLICY',
    initialBehavior,
    _meta,
  );
}
