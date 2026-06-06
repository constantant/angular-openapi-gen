import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposUpdateDeploymentBranchPolicyBody = NonNullable<
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}']['put']['requestBody']
>['content']['application/json'];

type ReposUpdateDeploymentBranchPolicyResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}']['put']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY = new InjectionToken<
  (
    owner: string,
    repo: string,
    environment_name: string,
    branch_policy_id: string,
    body:
      | ReposUpdateDeploymentBranchPolicyBody
      | Signal<ReposUpdateDeploymentBranchPolicyBody>,
  ) => ReturnType<
    typeof httpResource<ReposUpdateDeploymentBranchPolicyResponse>
  >
>('REPOS_UPDATE_DEPLOYMENT_BRANCH_POLICY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environment_name: string,
      branch_policy_id: string,
      body:
        | ReposUpdateDeploymentBranchPolicyBody
        | Signal<ReposUpdateDeploymentBranchPolicyBody>,
    ) =>
      httpResource<ReposUpdateDeploymentBranchPolicyResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environment_name}/deployment-branch-policies/${branch_policy_id}`,
        method: 'PUT',
        body,
      }));
  },
});
