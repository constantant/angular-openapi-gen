import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateDeploymentBranchPolicyBody = NonNullable<
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}']['put']['requestBody']
>['content']['application/json'];

export type ReposUpdateDeploymentBranchPolicyResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}']['put']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    branchPolicyId: string,
    body:
      | ReposUpdateDeploymentBranchPolicyBody
      | Signal<ReposUpdateDeploymentBranchPolicyBody>,
  ) => ReturnType<
    typeof httpResource<ReposUpdateDeploymentBranchPolicyResponse>
  >
>('REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY');

export function provideReposUpdateDeploymentBranchPolicy(): FactoryProvider {
  return {
    provide: REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        environmentName: string,
        branchPolicyId: string,
        body:
          | ReposUpdateDeploymentBranchPolicyBody
          | Signal<ReposUpdateDeploymentBranchPolicyBody>,
      ) =>
        httpResource<ReposUpdateDeploymentBranchPolicyResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment-branch-policies/${branchPolicyId}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
