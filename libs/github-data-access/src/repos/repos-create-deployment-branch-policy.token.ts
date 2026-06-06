import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateDeploymentBranchPolicyBody = NonNullable<
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateDeploymentBranchPolicyResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies']['post']['responses']['200']['content']['application/json'];

export const REPOS_CREATE_DEPLOYMENT_BRANCH_POLICY = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    body:
      | ReposCreateDeploymentBranchPolicyBody
      | Signal<ReposCreateDeploymentBranchPolicyBody>,
  ) => ReturnType<
    typeof httpResource<ReposCreateDeploymentBranchPolicyResponse>
  >
>('REPOS_CREATE_DEPLOYMENT_BRANCH_POLICY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environmentName: string,
      body:
        | ReposCreateDeploymentBranchPolicyBody
        | Signal<ReposCreateDeploymentBranchPolicyBody>,
    ) =>
      httpResource<ReposCreateDeploymentBranchPolicyResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment-branch-policies`,
        method: 'POST',
        body,
      }));
  },
});
