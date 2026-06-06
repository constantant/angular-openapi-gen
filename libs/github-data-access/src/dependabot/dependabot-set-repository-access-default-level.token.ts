import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotSetRepositoryAccessDefaultLevelBody = NonNullable<
  paths['/orgs/{org}/dependabot/repository-access/default-level']['put']['requestBody']
>['content']['application/json'];

export const DEPENDABOT_SET_REPOSITORY_ACCESS_DEFAULT_LEVEL =
  new InjectionToken<
    (
      org: string,
      body:
        | DependabotSetRepositoryAccessDefaultLevelBody
        | Signal<DependabotSetRepositoryAccessDefaultLevelBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('DEPENDABOT_SET_REPOSITORY_ACCESS_DEFAULT_LEVEL', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | DependabotSetRepositoryAccessDefaultLevelBody
          | Signal<DependabotSetRepositoryAccessDefaultLevelBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/dependabot/repository-access/default-level`,
          method: 'PUT',
          body,
        }));
    },
  });
