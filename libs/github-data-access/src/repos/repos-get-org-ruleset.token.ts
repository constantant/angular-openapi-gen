import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetOrgRulesetResponse =
  paths['/orgs/{org}/rulesets/{ruleset_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ORG_RULESET = new InjectionToken<
  (
    org: string,
    rulesetId: string,
  ) => ReturnType<typeof httpResource<ReposGetOrgRulesetResponse>>
>('REPOS_GET_ORG_RULESET');

export function provideReposGetOrgRuleset(): FactoryProvider {
  return {
    provide: REPOS_GET_ORG_RULESET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, rulesetId: string) =>
        httpResource<ReposGetOrgRulesetResponse>(() => ({
          url: `${base}/orgs/${org}/rulesets/${rulesetId}`,
        }));
    },
  };
}
