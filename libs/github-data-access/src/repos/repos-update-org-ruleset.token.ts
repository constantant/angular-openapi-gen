import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposUpdateOrgRulesetBody = NonNullable<
  paths['/orgs/{org}/rulesets/{ruleset_id}']['put']['requestBody']
>['content']['application/json'];

type ReposUpdateOrgRulesetResponse =
  paths['/orgs/{org}/rulesets/{ruleset_id}']['put']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_ORG_RULESET = new InjectionToken<
  (
    org: string,
    ruleset_id: string,
    body: ReposUpdateOrgRulesetBody | Signal<ReposUpdateOrgRulesetBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateOrgRulesetResponse>>
>('REPOS_UPDATE_ORG_RULESET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      ruleset_id: string,
      body: ReposUpdateOrgRulesetBody | Signal<ReposUpdateOrgRulesetBody>,
    ) =>
      httpResource<ReposUpdateOrgRulesetResponse>(() => ({
        url: `${base}/orgs/${org}/rulesets/${ruleset_id}`,
        method: 'PUT',
        body,
      }));
  },
});
