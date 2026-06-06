import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotUpdateRepositoryAccessForOrgBody = NonNullable<
  paths['/orgs/{org}/dependabot/repository-access']['patch']['requestBody']
>['content']['application/json'];

export const DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ORG = new InjectionToken<
  (
    org: string,
    body:
      | DependabotUpdateRepositoryAccessForOrgBody
      | Signal<DependabotUpdateRepositoryAccessForOrgBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | DependabotUpdateRepositoryAccessForOrgBody
        | Signal<DependabotUpdateRepositoryAccessForOrgBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/dependabot/repository-access`,
        method: 'PATCH',
        body,
      }));
  },
});
