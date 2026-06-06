import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetActionsCacheRetentionLimitForEnterpriseBody = NonNullable<
  paths['/enterprises/{enterprise}/actions/cache/retention-limit']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      body:
        | ActionsSetActionsCacheRetentionLimitForEnterpriseBody
        | Signal<ActionsSetActionsCacheRetentionLimitForEnterpriseBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ENTERPRISE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        body:
          | ActionsSetActionsCacheRetentionLimitForEnterpriseBody
          | Signal<ActionsSetActionsCacheRetentionLimitForEnterpriseBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/actions/cache/retention-limit`,
          method: 'PUT',
          body,
        }));
    },
  });
