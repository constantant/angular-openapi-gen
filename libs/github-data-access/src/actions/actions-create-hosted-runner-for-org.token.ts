import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateHostedRunnerForOrgBody = NonNullable<
  paths['/orgs/{org}/actions/hosted-runners']['post']['requestBody']
>['content']['application/json'];

export type ActionsCreateHostedRunnerForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_HOSTED_RUNNER_FOR_ORG = new InjectionToken<
  (
    org: string,
    body:
      | ActionsCreateHostedRunnerForOrgBody
      | Signal<ActionsCreateHostedRunnerForOrgBody>,
  ) => ReturnType<typeof httpResource<ActionsCreateHostedRunnerForOrgResponse>>
>('ACTIONS_CREATE_HOSTED_RUNNER_FOR_ORG');

export function provideActionsCreateHostedRunnerForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_CREATE_HOSTED_RUNNER_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsCreateHostedRunnerForOrgBody
          | Signal<ActionsCreateHostedRunnerForOrgBody>,
      ) =>
        httpResource<ActionsCreateHostedRunnerForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/hosted-runners`,
          method: 'POST',
          body,
        }));
    },
  };
}
