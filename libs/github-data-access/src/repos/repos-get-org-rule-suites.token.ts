import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetOrgRuleSuitesParams =
  paths['/orgs/{org}/rulesets/rule-suites']['get']['parameters']['query'];

export type ReposGetOrgRuleSuitesResponse =
  paths['/orgs/{org}/rulesets/rule-suites']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ORG_RULE_SUITES = new InjectionToken<
  (
    org: string,
    params?:
      | ReposGetOrgRuleSuitesParams
      | (() => ReposGetOrgRuleSuitesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetOrgRuleSuitesResponse>>
>('REPOS_GET_ORG_RULE_SUITES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | ReposGetOrgRuleSuitesParams
        | (() => ReposGetOrgRuleSuitesParams | undefined),
    ) =>
      httpResource<ReposGetOrgRuleSuitesResponse>(() => ({
        url: `${base}/orgs/${org}/rulesets/rule-suites`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
