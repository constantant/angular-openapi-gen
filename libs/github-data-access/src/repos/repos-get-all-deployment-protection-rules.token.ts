import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetAllDeploymentProtectionRulesResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES = new InjectionToken<
  (
    environment_name: string,
    repo: string,
    owner: string,
  ) => ReturnType<
    typeof httpResource<ReposGetAllDeploymentProtectionRulesResponse>
  >
>('REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (environment_name: string, repo: string, owner: string) =>
      httpResource<ReposGetAllDeploymentProtectionRulesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environment_name}/deployment_protection_rules`,
      }));
  },
});
