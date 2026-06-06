import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetCustomDeploymentProtectionRuleResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE = new InjectionToken<
  (
    owner: string,
    repo: string,
    environment_name: string,
    protection_rule_id: string,
  ) => ReturnType<
    typeof httpResource<ReposGetCustomDeploymentProtectionRuleResponse>
  >
>('REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environment_name: string,
      protection_rule_id: string,
    ) =>
      httpResource<ReposGetCustomDeploymentProtectionRuleResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environment_name}/deployment_protection_rules/${protection_rule_id}`,
      }));
  },
});
