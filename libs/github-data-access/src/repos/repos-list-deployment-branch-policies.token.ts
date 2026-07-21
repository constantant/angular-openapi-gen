import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListDeploymentBranchPoliciesParams =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies']['get']['parameters']['query'];

export type ReposListDeploymentBranchPoliciesResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    total_count: {
      description:
        'The number of deployment branch policies for the environment.',
      type: 'integer',
      example: 2,
    },
    branch_policies: {
      type: 'array',
      items: {
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
      },
    },
  },
  required: ['total_count', 'branch_policies'],
};

function _validateResponse(
  value: unknown,
): ReposListDeploymentBranchPoliciesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListDeploymentBranchPolicies response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListDeploymentBranchPoliciesResponse;
}

export const REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    params?:
      | ReposListDeploymentBranchPoliciesParams
      | (() => ReposListDeploymentBranchPoliciesParams | undefined),
  ) => ReturnType<
    typeof httpResource<ReposListDeploymentBranchPoliciesResponse>
  >
>('REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES');

export function provideReposListDeploymentBranchPolicies(): FactoryProvider {
  return {
    provide: REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        environmentName: string,
        params?:
          | ReposListDeploymentBranchPoliciesParams
          | (() => ReposListDeploymentBranchPoliciesParams | undefined),
      ) =>
        httpResource<ReposListDeploymentBranchPoliciesResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment-branch-policies`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
          { parse: _validateResponse },
        );
    },
  };
}
