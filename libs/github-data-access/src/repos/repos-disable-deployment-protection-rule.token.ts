import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE = new InjectionToken<
  (
    environment_name: string,
    repo: string,
    owner: string,
    protection_rule_id: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DISABLE_DEPLOYMENT_PROTECTION_RULE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      environment_name: string,
      repo: string,
      owner: string,
      protection_rule_id: string,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environment_name}/deployment_protection_rules/${protection_rule_id}`,
        method: 'DELETE',
      }));
  },
});
