import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetActionsCacheRetentionLimitForEnterpriseResponse =
  paths['/enterprises/{enterprise}/actions/cache/retention-limit']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetActionsCacheRetentionLimitForEnterpriseResponse>
    >
  >('ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ENTERPRISE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (enterprise: string) =>
        httpResource<ActionsGetActionsCacheRetentionLimitForEnterpriseResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/actions/cache/retention-limit`,
          }),
        );
    },
  });
