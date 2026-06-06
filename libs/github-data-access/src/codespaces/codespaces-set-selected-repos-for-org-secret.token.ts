import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesSetSelectedReposForOrgSecretBody = NonNullable<
  paths['/orgs/{org}/codespaces/secrets/{secret_name}/repositories']['put']['requestBody']
>['content']['application/json'];

export const CODESPACES_SET_SELECTED_REPOS_FOR_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    body:
      | CodespacesSetSelectedReposForOrgSecretBody
      | Signal<CodespacesSetSelectedReposForOrgSecretBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODESPACES_SET_SELECTED_REPOS_FOR_ORG_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      secretName: string,
      body:
        | CodespacesSetSelectedReposForOrgSecretBody
        | Signal<CodespacesSetSelectedReposForOrgSecretBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/codespaces/secrets/${secretName}/repositories`,
        method: 'PUT',
        body,
      }));
  },
});
