import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotUpdateRepositoryAccessForEnterpriseBody = NonNullable<
  paths['/enterprises/{enterprise}/dependabot/repository-access']['patch']['requestBody']
>['content']['application/json'];

export const DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      body:
        | DependabotUpdateRepositoryAccessForEnterpriseBody
        | Signal<DependabotUpdateRepositoryAccessForEnterpriseBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ENTERPRISE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        body:
          | DependabotUpdateRepositoryAccessForEnterpriseBody
          | Signal<DependabotUpdateRepositoryAccessForEnterpriseBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/dependabot/repository-access`,
          method: 'PATCH',
          body,
        }));
    },
  });
