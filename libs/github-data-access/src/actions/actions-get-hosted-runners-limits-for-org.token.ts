import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetHostedRunnersLimitsForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners/limits']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_HOSTED_RUNNERS_LIMITS_FOR_ORG = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<ActionsGetHostedRunnersLimitsForOrgResponse>
  >
>('ACTIONS_GET_HOSTED_RUNNERS_LIMITS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<ActionsGetHostedRunnersLimitsForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/actions/hosted-runners/limits`,
      }));
  },
});
