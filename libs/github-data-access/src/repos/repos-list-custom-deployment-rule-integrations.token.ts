import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListCustomDeploymentRuleIntegrationsParams =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps']['get']['parameters']['query'];

type ReposListCustomDeploymentRuleIntegrationsResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS =
  new InjectionToken<
    (
      environment_name: string,
      repo: string,
      owner: string,
      params?: ReposListCustomDeploymentRuleIntegrationsParams,
    ) => ReturnType<
      typeof httpResource<ReposListCustomDeploymentRuleIntegrationsResponse>
    >
  >('REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        environment_name: string,
        repo: string,
        owner: string,
        params?: ReposListCustomDeploymentRuleIntegrationsParams,
      ) =>
        httpResource<ReposListCustomDeploymentRuleIntegrationsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environment_name}/deployment_protection_rules/apps`,
          params: params as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  });
