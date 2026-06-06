import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateOrgVariableBody = NonNullable<
  paths['/orgs/{org}/actions/variables']['post']['requestBody']
>['content']['application/json'];

export type ActionsCreateOrgVariableResponse =
  paths['/orgs/{org}/actions/variables']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    body: ActionsCreateOrgVariableBody | Signal<ActionsCreateOrgVariableBody>,
  ) => ReturnType<typeof httpResource<ActionsCreateOrgVariableResponse>>
>('ACTIONS_CREATE_ORG_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body: ActionsCreateOrgVariableBody | Signal<ActionsCreateOrgVariableBody>,
    ) =>
      httpResource<ActionsCreateOrgVariableResponse>(() => ({
        url: `${base}/orgs/${org}/actions/variables`,
        method: 'POST',
        body,
      }));
  },
});
