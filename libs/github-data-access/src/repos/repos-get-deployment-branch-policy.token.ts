import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetDeploymentBranchPolicyResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Deployment branch policy',
  description: 'Details of a deployment branch or tag policy.',
  type: 'object',
  properties: {
    id: {
      description: 'The unique identifier of the branch or tag policy.',
      type: 'integer',
      example: 361471,
    },
    node_id: {
      type: 'string',
      example: 'MDE2OkdhdGVCcmFuY2hQb2xpY3kzNjE0NzE=',
    },
    name: {
      description:
        'The name pattern that branches or tags must match in order to deploy to the environment.',
      type: 'string',
      example: 'release/*',
    },
    type: {
      description: 'Whether this rule targets a branch or tag.',
      type: 'string',
      example: 'branch',
      enum: ['branch', 'tag'],
    },
  },
};

function _validateResponse(
  value: unknown,
): ReposGetDeploymentBranchPolicyResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetDeploymentBranchPolicy response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetDeploymentBranchPolicyResponse;
}

export const REPOS_GET_DEPLOYMENT_BRANCH_POLICY = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    branchPolicyId: string,
  ) => ReturnType<typeof httpResource<ReposGetDeploymentBranchPolicyResponse>>
>('REPOS_GET_DEPLOYMENT_BRANCH_POLICY');

export function provideReposGetDeploymentBranchPolicy(): FactoryProvider {
  return {
    provide: REPOS_GET_DEPLOYMENT_BRANCH_POLICY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        environmentName: string,
        branchPolicyId: string,
      ) =>
        httpResource<ReposGetDeploymentBranchPolicyResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment-branch-policies/${branchPolicyId}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
