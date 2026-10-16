import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { trackResource } from '../mock-hook';

export type ReposDeleteOrgRulesetError =
  | paths['/orgs/{org}/rulesets/{ruleset_id}']['delete']['responses']['404']['content']['application/json']
  | paths['/orgs/{org}/rulesets/{ruleset_id}']['delete']['responses']['500']['content']['application/json'];

export const REPOS_DELETE_ORG_RULESET = new InjectionToken<
  (org: string, rulesetId: string) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_ORG_RULESET');

export function provideReposDeleteOrgRuleset(): FactoryProvider {
  return {
    provide: REPOS_DELETE_ORG_RULESET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, rulesetId: string) =>
        trackResource(
          'REPOS_DELETE_ORG_RULESET',
          httpResource<unknown>(() => ({
            url: `${base}/orgs/${encodeURIComponent(org)}/rulesets/${encodeURIComponent(rulesetId)}`,
            method: 'DELETE',
          })),
        );
    },
  };
}
