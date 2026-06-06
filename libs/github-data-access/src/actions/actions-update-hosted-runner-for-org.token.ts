import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsUpdateHostedRunnerForOrgBody = NonNullable<
  paths['/orgs/{org}/actions/hosted-runners/{hosted_runner_id}']['patch']['requestBody']
>['content']['application/json'];

export type ActionsUpdateHostedRunnerForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners/{hosted_runner_id}']['patch']['responses']['200']['content']['application/json'];

export const ACTIONS_UPDATE_HOSTED_RUNNER_FOR_ORG = new InjectionToken<
  (
    org: string,
    hostedRunnerId: string,
    body:
      | ActionsUpdateHostedRunnerForOrgBody
      | Signal<ActionsUpdateHostedRunnerForOrgBody>,
  ) => ReturnType<typeof httpResource<ActionsUpdateHostedRunnerForOrgResponse>>
>('ACTIONS_UPDATE_HOSTED_RUNNER_FOR_ORG');

export function provideActionsUpdateHostedRunnerForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_UPDATE_HOSTED_RUNNER_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        hostedRunnerId: string,
        body:
          | ActionsUpdateHostedRunnerForOrgBody
          | Signal<ActionsUpdateHostedRunnerForOrgBody>,
      ) =>
        httpResource<ActionsUpdateHostedRunnerForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/hosted-runners/${hostedRunnerId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
