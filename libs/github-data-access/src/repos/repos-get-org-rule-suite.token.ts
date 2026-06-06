import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetOrgRuleSuiteResponse =
  paths['/orgs/{org}/rulesets/rule-suites/{rule_suite_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ORG_RULE_SUITE = new InjectionToken<
  (
    org: string,
    ruleSuiteId: string,
  ) => ReturnType<typeof httpResource<ReposGetOrgRuleSuiteResponse>>
>('REPOS_GET_ORG_RULE_SUITE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, ruleSuiteId: string) =>
      httpResource<ReposGetOrgRuleSuiteResponse>(() => ({
        url: `${base}/orgs/${org}/rulesets/rule-suites/${ruleSuiteId}`,
      }));
  },
});
