import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListCustomDeploymentRuleIntegrationsParams =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps']['get']['parameters']['query'];

export type ReposListCustomDeploymentRuleIntegrationsResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS =
  new InjectionToken<
    (
      environmentName: string,
      repo: string,
      owner: string,
      params?:
        | ReposListCustomDeploymentRuleIntegrationsParams
        | (() => ReposListCustomDeploymentRuleIntegrationsParams | undefined),
    ) => ReturnType<
      typeof httpResource<ReposListCustomDeploymentRuleIntegrationsResponse>
    >
  >('REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS');

export function provideReposListCustomDeploymentRuleIntegrations(): FactoryProvider {
  return {
    provide: REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        environmentName: string,
        repo: string,
        owner: string,
        params?:
          | ReposListCustomDeploymentRuleIntegrationsParams
          | (() => ReposListCustomDeploymentRuleIntegrationsParams | undefined),
      ) =>
        httpResource<ReposListCustomDeploymentRuleIntegrationsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment_protection_rules/apps`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
