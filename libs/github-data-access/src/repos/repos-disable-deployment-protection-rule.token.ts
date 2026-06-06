import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE = new InjectionToken<
  (
    environmentName: string,
    repo: string,
    owner: string,
    protectionRuleId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      environmentName: string,
      repo: string,
      owner: string,
      protectionRuleId: string,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment_protection_rules/${protectionRuleId}`,
        method: 'DELETE',
      }));
  },
});
