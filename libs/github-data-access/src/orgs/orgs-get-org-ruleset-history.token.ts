import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('ORGS_GET_ORG_RULESET_HISTORY');

export function provideOrgsGetOrgRulesetHistory(): FactoryProvider {
  return {
    provide: ORGS_GET_ORG_RULESET_HISTORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        rulesetId: string,
        params?:
          | OrgsGetOrgRulesetHistoryParams
          | (() => OrgsGetOrgRulesetHistoryParams | undefined),
      ) =>
        httpResource<OrgsGetOrgRulesetHistoryResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/rulesets/${rulesetId}/history`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
