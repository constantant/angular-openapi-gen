import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetRepoRuleSuiteResponse =
  paths['/repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_REPO_RULE_SUITE = new InjectionToken<
  (
    owner: string,
    repo: string,
    rule_suite_id: string,
  ) => ReturnType<typeof httpResource<ReposGetRepoRuleSuiteResponse>>
>('REPOS_GET_REPO_RULE_SUITE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, rule_suite_id: string) =>
      httpResource<ReposGetRepoRuleSuiteResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/rulesets/rule-suites/${rule_suite_id}`,
      }));
  },
});
