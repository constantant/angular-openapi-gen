import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListRunnerApplicationsForOrgResponse =
  paths['/orgs/{org}/actions/runners/downloads']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_ORG = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<ActionsListRunnerApplicationsForOrgResponse>
  >
>('ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<ActionsListRunnerApplicationsForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/actions/runners/downloads`,
      }));
  },
});
