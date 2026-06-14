import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetHostedRunnerForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners/{hosted_runner_id}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_HOSTED_RUNNER_FOR_ORG = new InjectionToken<
  (
    org: string,
    hostedRunnerId: string,
  ) => ReturnType<typeof httpResource<ActionsGetHostedRunnerForOrgResponse>>
>('ACTIONS_GET_HOSTED_RUNNER_FOR_ORG');

export function provideActionsGetHostedRunnerForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_GET_HOSTED_RUNNER_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, hostedRunnerId: string) =>
        httpResource<ActionsGetHostedRunnerForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/hosted-runners/${hostedRunnerId}`,
        }));
    },
  };
}
