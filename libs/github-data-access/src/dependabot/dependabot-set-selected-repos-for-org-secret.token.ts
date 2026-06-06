import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotSetSelectedReposForOrgSecretBody = NonNullable<
  paths['/orgs/{org}/dependabot/secrets/{secret_name}/repositories']['put']['requestBody']
>['content']['application/json'];

export const DEPENDABOT_SET_SELECTED_REPOS_FOR_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    body:
      | DependabotSetSelectedReposForOrgSecretBody
      | Signal<DependabotSetSelectedReposForOrgSecretBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('DEPENDABOT_SET_SELECTED_REPOS_FOR_ORG_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      secretName: string,
      body:
        | DependabotSetSelectedReposForOrgSecretBody
        | Signal<DependabotSetSelectedReposForOrgSecretBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/dependabot/secrets/${secretName}/repositories`,
        method: 'PUT',
        body,
      }));
  },
});
