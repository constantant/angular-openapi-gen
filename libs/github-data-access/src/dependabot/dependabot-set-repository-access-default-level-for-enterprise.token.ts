import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotSetRepositoryAccessDefaultLevelForEnterpriseBody =
  NonNullable<
    paths['/enterprises/{enterprise}/dependabot/repository-access/default-level']['put']['requestBody']
  >['content']['application/json'];

export const DEPENDABOT_SET_REPOSITORY_ACCESS_DEFAULT_LEVEL_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      body:
        | DependabotSetRepositoryAccessDefaultLevelForEnterpriseBody
        | Signal<DependabotSetRepositoryAccessDefaultLevelForEnterpriseBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('DEPENDABOT_SET_REPOSITORY_ACCESS_DEFAULT_LEVEL_FOR_ENTERPRISE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        body:
          | DependabotSetRepositoryAccessDefaultLevelForEnterpriseBody
          | Signal<DependabotSetRepositoryAccessDefaultLevelForEnterpriseBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/dependabot/repository-access/default-level`,
          method: 'PUT',
          body,
        }));
    },
  });
