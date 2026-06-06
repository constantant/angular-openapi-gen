import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetRepoRuleSuitesParams =
  paths['/repos/{owner}/{repo}/rulesets/rule-suites']['get']['parameters']['query'];

type ReposGetRepoRuleSuitesResponse =
  paths['/repos/{owner}/{repo}/rulesets/rule-suites']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_REPO_RULE_SUITES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposGetRepoRuleSuitesParams,
  ) => ReturnType<typeof httpResource<ReposGetRepoRuleSuitesResponse>>
>('REPOS_GET_REPO_RULE_SUITES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?: ReposGetRepoRuleSuitesParams,
    ) =>
      httpResource<ReposGetRepoRuleSuitesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/rulesets/rule-suites`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
