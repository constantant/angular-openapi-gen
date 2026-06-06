import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCreateDeploymentProtectionRuleBody = NonNullable<
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules']['post']['requestBody']
>['content']['application/json'];

type ReposCreateDeploymentProtectionRuleResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_DEPLOYMENT_PROTECTION_RULE = new InjectionToken<
  (
    environment_name: string,
    repo: string,
    owner: string,
    body:
      | ReposCreateDeploymentProtectionRuleBody
      | Signal<ReposCreateDeploymentProtectionRuleBody>,
  ) => ReturnType<
    typeof httpResource<ReposCreateDeploymentProtectionRuleResponse>
  >
>('REPOS_CREATE_DEPLOYMENT_PROTECTION_RULE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      environment_name: string,
      repo: string,
      owner: string,
      body:
        | ReposCreateDeploymentProtectionRuleBody
        | Signal<ReposCreateDeploymentProtectionRuleBody>,
    ) =>
      httpResource<ReposCreateDeploymentProtectionRuleResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environment_name}/deployment_protection_rules`,
        method: 'POST',
        body,
      }));
  },
});
