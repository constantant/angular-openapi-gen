import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateRepoRulesetBody = NonNullable<
  paths['/repos/{owner}/{repo}/rulesets']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateRepoRulesetResponse =
  paths['/repos/{owner}/{repo}/rulesets']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_REPO_RULESET = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateRepoRulesetBody | Signal<ReposCreateRepoRulesetBody>,
  ) => ReturnType<typeof httpResource<ReposCreateRepoRulesetResponse>>
>('REPOS_CREATE_REPO_RULESET');

export function provideReposCreateRepoRuleset(): FactoryProvider {
  return {
    provide: REPOS_CREATE_REPO_RULESET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposCreateRepoRulesetBody | Signal<ReposCreateRepoRulesetBody>,
      ) =>
        httpResource<ReposCreateRepoRulesetResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/rulesets`,
          method: 'POST',
          body,
        }));
    },
  };
}
