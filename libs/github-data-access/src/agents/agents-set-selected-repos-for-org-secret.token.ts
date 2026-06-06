import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsSetSelectedReposForOrgSecretBody = NonNullable<
  paths['/orgs/{org}/agents/secrets/{secret_name}/repositories']['put']['requestBody']
>['content']['application/json'];

export const AGENTS_SET_SELECTED_REPOS_FOR_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    body:
      | AgentsSetSelectedReposForOrgSecretBody
      | Signal<AgentsSetSelectedReposForOrgSecretBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('AGENTS_SET_SELECTED_REPOS_FOR_ORG_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      secretName: string,
      body:
        | AgentsSetSelectedReposForOrgSecretBody
        | Signal<AgentsSetSelectedReposForOrgSecretBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/agents/secrets/${secretName}/repositories`,
        method: 'PUT',
        body,
      }));
  },
});
