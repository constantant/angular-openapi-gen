import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetOrgRulesetResponse =
  paths['/orgs/{org}/rulesets/{ruleset_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ORG_RULESET = new InjectionToken<
  (
    org: string,
    ruleset_id: string,
  ) => ReturnType<typeof httpResource<ReposGetOrgRulesetResponse>>
>('REPOS_GET_ORG_RULESET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, ruleset_id: string) =>
      httpResource<ReposGetOrgRulesetResponse>(() => ({
        url: `${base}/orgs/${org}/rulesets/${ruleset_id}`,
      }));
  },
});
