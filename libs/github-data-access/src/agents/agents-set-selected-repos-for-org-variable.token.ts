import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsSetSelectedReposForOrgVariableBody = NonNullable<
  paths['/orgs/{org}/agents/variables/{name}/repositories']['put']['requestBody']
>['content']['application/json'];

export const AGENTS_SET_SELECTED_REPOS_FOR_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    name: string,
    body:
      | AgentsSetSelectedReposForOrgVariableBody
      | Signal<AgentsSetSelectedReposForOrgVariableBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('AGENTS_SET_SELECTED_REPOS_FOR_ORG_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      name: string,
      body:
        | AgentsSetSelectedReposForOrgVariableBody
        | Signal<AgentsSetSelectedReposForOrgVariableBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/agents/variables/${name}/repositories`,
        method: 'PUT',
        body,
      }));
  },
});
