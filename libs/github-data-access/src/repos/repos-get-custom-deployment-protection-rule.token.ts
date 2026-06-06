import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCustomDeploymentProtectionRuleResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    protectionRuleId: string,
  ) => ReturnType<
    typeof httpResource<ReposGetCustomDeploymentProtectionRuleResponse>
  >
>('REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE');

export function provideReposGetCustomDeploymentProtectionRule(): FactoryProvider {
  return {
    provide: REPOS_GET_CUSTOM_DEPLOYMENT_PROTECTION_RULE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        environmentName: string,
        protectionRuleId: string,
      ) =>
        httpResource<ReposGetCustomDeploymentProtectionRuleResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment_protection_rules/${protectionRuleId}`,
        }));
    },
  };
}
