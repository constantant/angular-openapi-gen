import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetActionsCacheStorageLimitForEnterpriseBody = NonNullable<
  paths['/enterprises/{enterprise}/actions/cache/storage-limit']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      body:
        | ActionsSetActionsCacheStorageLimitForEnterpriseBody
        | Signal<ActionsSetActionsCacheStorageLimitForEnterpriseBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ENTERPRISE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        body:
          | ActionsSetActionsCacheStorageLimitForEnterpriseBody
          | Signal<ActionsSetActionsCacheStorageLimitForEnterpriseBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/actions/cache/storage-limit`,
          method: 'PUT',
          body,
        }));
    },
  });
