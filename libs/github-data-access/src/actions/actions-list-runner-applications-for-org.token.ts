import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_ORG');

export function provideActionsListRunnerApplicationsForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsListRunnerApplicationsForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/runners/downloads`,
        }));
    },
  };
}
