import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_ORG_RULESET = new InjectionToken<
  (org: string, rulesetId: string) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_ORG_RULESET');

export function provideReposDeleteOrgRuleset(): FactoryProvider {
  return {
    provide: REPOS_DELETE_ORG_RULESET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, rulesetId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/rulesets/${rulesetId}`,
          method: 'DELETE',
        }));
    },
  };
}
