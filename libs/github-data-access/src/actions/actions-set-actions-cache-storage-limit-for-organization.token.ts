import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetActionsCacheStorageLimitForOrganizationBody = NonNullable<
  paths['/organizations/{org}/actions/cache/storage-limit']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsSetActionsCacheStorageLimitForOrganizationBody
        | Signal<ActionsSetActionsCacheStorageLimitForOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION');

export function provideActionsSetActionsCacheStorageLimitForOrganization(): FactoryProvider {
  return {
    provide: ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsSetActionsCacheStorageLimitForOrganizationBody
          | Signal<ActionsSetActionsCacheStorageLimitForOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/organizations/${org}/actions/cache/storage-limit`,
          method: 'PUT',
          body,
        }));
    },
  };
}
