import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetActionsCacheStorageLimitForOrganizationResponse =
  paths['/organizations/{org}/actions/cache/storage-limit']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetActionsCacheStorageLimitForOrganizationResponse>
    >
  >('ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetActionsCacheStorageLimitForOrganizationResponse>(
          () => ({
            url: `${base}/organizations/${org}/actions/cache/storage-limit`,
          }),
        );
    },
  });
