import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetHostedRunnersPlatformsForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners/platforms']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_HOSTED_RUNNERS_PLATFORMS_FOR_ORG = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<ActionsGetHostedRunnersPlatformsForOrgResponse>
  >
>('ACTIONS_GET_HOSTED_RUNNERS_PLATFORMS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<ActionsGetHostedRunnersPlatformsForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/actions/hosted-runners/platforms`,
      }));
  },
});
