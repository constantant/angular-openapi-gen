import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposUpdateDeploymentBranchPolicy,
  type ReposUpdateDeploymentBranchPolicyResponse,
} from './repos-update-deployment-branch-policy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-deployment-branch-policy',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}',
  method: 'put',
  tag: 'repos',
};

export const REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY_MOCK: MockEndpoint<ReposUpdateDeploymentBranchPolicyResponse> =
  {
    key: 'REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdateDeploymentBranchPolicy,
  };

export function provideReposUpdateDeploymentBranchPolicyMock(
  initialBehavior?: MockEndpointBehavior<ReposUpdateDeploymentBranchPolicyResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY_MOCK,
    initialBehavior,
  );
}
