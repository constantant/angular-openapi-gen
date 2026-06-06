import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetActionsCacheStorageLimitForEnterpriseResponse =
  paths['/enterprises/{enterprise}/actions/cache/storage-limit']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetActionsCacheStorageLimitForEnterpriseResponse>
    >
  >('ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ENTERPRISE');

export function provideActionsGetActionsCacheStorageLimitForEnterprise(): FactoryProvider {
  return {
    provide: ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ENTERPRISE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (enterprise: string) =>
        httpResource<ActionsGetActionsCacheStorageLimitForEnterpriseResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/actions/cache/storage-limit`,
          }),
        );
    },
  };
}
