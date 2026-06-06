import { InjectionToken, inject } from '@angular/core';
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
>('ORGS_GET_ORG_RULESET_VERSION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, rulesetId: string, versionId: string) =>
      httpResource<OrgsGetOrgRulesetVersionResponse>(() => ({
        url: `${base}/orgs/${org}/rulesets/${rulesetId}/history/${versionId}`,
      }));
  },
});
