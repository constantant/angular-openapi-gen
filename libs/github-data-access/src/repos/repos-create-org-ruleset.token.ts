import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateOrgRulesetBody = NonNullable<
  paths['/orgs/{org}/rulesets']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateOrgRulesetResponse =
  paths['/orgs/{org}/rulesets']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_ORG_RULESET = new InjectionToken<
  (
    org: string,
    body: ReposCreateOrgRulesetBody | Signal<ReposCreateOrgRulesetBody>,
  ) => ReturnType<typeof httpResource<ReposCreateOrgRulesetResponse>>
>('REPOS_CREATE_ORG_RULESET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body: ReposCreateOrgRulesetBody | Signal<ReposCreateOrgRulesetBody>,
    ) =>
      httpResource<ReposCreateOrgRulesetResponse>(() => ({
        url: `${base}/orgs/${org}/rulesets`,
        method: 'POST',
        body,
      }));
  },
});
