import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetSelectedReposForOrgVariableBody = NonNullable<
  paths['/orgs/{org}/actions/variables/{name}/repositories']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_SELECTED_REPOS_FOR_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    name: string,
    body:
      | ActionsSetSelectedReposForOrgVariableBody
      | Signal<ActionsSetSelectedReposForOrgVariableBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_SET_SELECTED_REPOS_FOR_ORG_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      name: string,
      body:
        | ActionsSetSelectedReposForOrgVariableBody
        | Signal<ActionsSetSelectedReposForOrgVariableBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/actions/variables/${name}/repositories`,
        method: 'PUT',
        body,
      }));
  },
});
