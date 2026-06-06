import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGenerateRunnerJitconfigForOrgBody = NonNullable<
  paths['/orgs/{org}/actions/runners/generate-jitconfig']['post']['requestBody']
>['content']['application/json'];

export type ActionsGenerateRunnerJitconfigForOrgResponse =
  paths['/orgs/{org}/actions/runners/generate-jitconfig']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_ORG = new InjectionToken<
  (
    org: string,
    body:
      | ActionsGenerateRunnerJitconfigForOrgBody
      | Signal<ActionsGenerateRunnerJitconfigForOrgBody>,
  ) => ReturnType<
    typeof httpResource<ActionsGenerateRunnerJitconfigForOrgResponse>
  >
>('ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | ActionsGenerateRunnerJitconfigForOrgBody
        | Signal<ActionsGenerateRunnerJitconfigForOrgBody>,
    ) =>
      httpResource<ActionsGenerateRunnerJitconfigForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/actions/runners/generate-jitconfig`,
        method: 'POST',
        body,
      }));
  },
});
