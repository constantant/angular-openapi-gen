import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateSelfHostedRunnerGroupForOrgBody = NonNullable<
  paths['/orgs/{org}/actions/runner-groups']['post']['requestBody']
>['content']['application/json'];

export type ActionsCreateSelfHostedRunnerGroupForOrgResponse =
  paths['/orgs/{org}/actions/runner-groups']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsCreateSelfHostedRunnerGroupForOrgBody
        | Signal<ActionsCreateSelfHostedRunnerGroupForOrgBody>,
    ) => ReturnType<
      typeof httpResource<ActionsCreateSelfHostedRunnerGroupForOrgResponse>
    >
  >('ACTIONS_CREATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsCreateSelfHostedRunnerGroupForOrgBody
          | Signal<ActionsCreateSelfHostedRunnerGroupForOrgBody>,
      ) =>
        httpResource<ActionsCreateSelfHostedRunnerGroupForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/runner-groups`,
          method: 'POST',
          body,
        }));
    },
  });
