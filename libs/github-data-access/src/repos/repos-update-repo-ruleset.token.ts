import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposUpdateRepoRulesetBody = NonNullable<
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}']['put']['requestBody']
>['content']['application/json'];

type ReposUpdateRepoRulesetResponse =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}']['put']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_REPO_RULESET = new InjectionToken<
  (
    owner: string,
    repo: string,
    ruleset_id: string,
    body: ReposUpdateRepoRulesetBody | Signal<ReposUpdateRepoRulesetBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateRepoRulesetResponse>>
>('REPOS_UPDATE_REPO_RULESET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      ruleset_id: string,
      body: ReposUpdateRepoRulesetBody | Signal<ReposUpdateRepoRulesetBody>,
    ) =>
      httpResource<ReposUpdateRepoRulesetResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/rulesets/${ruleset_id}`,
        method: 'PUT',
        body,
      }));
  },
});
