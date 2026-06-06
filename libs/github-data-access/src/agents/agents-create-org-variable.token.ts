import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsCreateOrgVariableBody = NonNullable<
  paths['/orgs/{org}/agents/variables']['post']['requestBody']
>['content']['application/json'];

export type AgentsCreateOrgVariableResponse =
  paths['/orgs/{org}/agents/variables']['post']['responses']['201']['content']['application/json'];

export const AGENTS_CREATE_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    body: AgentsCreateOrgVariableBody | Signal<AgentsCreateOrgVariableBody>,
  ) => ReturnType<typeof httpResource<AgentsCreateOrgVariableResponse>>
>('AGENTS_CREATE_ORG_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body: AgentsCreateOrgVariableBody | Signal<AgentsCreateOrgVariableBody>,
    ) =>
      httpResource<AgentsCreateOrgVariableResponse>(() => ({
        url: `${base}/orgs/${org}/agents/variables`,
        method: 'POST',
        body,
      }));
  },
});
