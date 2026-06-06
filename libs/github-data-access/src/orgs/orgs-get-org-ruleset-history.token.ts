import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetOrgRulesetHistoryParams =
  paths['/orgs/{org}/rulesets/{ruleset_id}/history']['get']['parameters']['query'];

export type OrgsGetOrgRulesetHistoryResponse =
  paths['/orgs/{org}/rulesets/{ruleset_id}/history']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET_ORG_RULESET_HISTORY = new InjectionToken<
  (
    org: string,
    rulesetId: string,
    params?:
      | OrgsGetOrgRulesetHistoryParams
      | (() => OrgsGetOrgRulesetHistoryParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsGetOrgRulesetHistoryResponse>>
>('ORGS_GET_ORG_RULESET_HISTORY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      rulesetId: string,
      params?:
        | OrgsGetOrgRulesetHistoryParams
        | (() => OrgsGetOrgRulesetHistoryParams | undefined),
    ) =>
      httpResource<OrgsGetOrgRulesetHistoryResponse>(() => ({
        url: `${base}/orgs/${org}/rulesets/${rulesetId}/history`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
