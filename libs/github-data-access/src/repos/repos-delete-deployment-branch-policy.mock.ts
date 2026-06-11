import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY } from './repos-delete-deployment-branch-policy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-deployment-branch-policy',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteDeploymentBranchPolicyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY,
    'REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY',
    initialBehavior,
    _meta,
  );
}
