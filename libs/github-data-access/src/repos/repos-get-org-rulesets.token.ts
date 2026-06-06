import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetOrgRulesetsParams =
  paths['/orgs/{org}/rulesets']['get']['parameters']['query'];

export type ReposGetOrgRulesetsResponse =
  paths['/orgs/{org}/rulesets']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ORG_RULESETS = new InjectionToken<
  (
    org: string,
    params?:
      | ReposGetOrgRulesetsParams
      | (() => ReposGetOrgRulesetsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetOrgRulesetsResponse>>
>('REPOS_GET_ORG_RULESETS');

export function provideReposGetOrgRulesets(): FactoryProvider {
  return {
    provide: REPOS_GET_ORG_RULESETS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ReposGetOrgRulesetsParams
          | (() => ReposGetOrgRulesetsParams | undefined),
      ) =>
        httpResource<ReposGetOrgRulesetsResponse>(() => ({
          url: `${base}/orgs/${org}/rulesets`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
