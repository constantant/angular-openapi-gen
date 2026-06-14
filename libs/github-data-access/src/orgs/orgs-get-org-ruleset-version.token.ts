import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetOrgRulesetVersionResponse =
  paths['/orgs/{org}/rulesets/{ruleset_id}/history/{version_id}']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET_ORG_RULESET_VERSION = new InjectionToken<
  (
    org: string,
    rulesetId: string,
    versionId: string,
  ) => ReturnType<typeof httpResource<OrgsGetOrgRulesetVersionResponse>>
>('ORGS_GET_ORG_RULESET_VERSION');

export function provideOrgsGetOrgRulesetVersion(): FactoryProvider {
  return {
    provide: ORGS_GET_ORG_RULESET_VERSION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, rulesetId: string, versionId: string) =>
        httpResource<OrgsGetOrgRulesetVersionResponse>(() => ({
          url: `${base}/orgs/${org}/rulesets/${rulesetId}/history/${versionId}`,
        }));
    },
  };
}
