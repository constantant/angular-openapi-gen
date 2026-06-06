import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecurityAdvisoriesListGlobalAdvisoriesParams =
  paths['/advisories']['get']['parameters']['query'];

export type SecurityAdvisoriesListGlobalAdvisoriesResponse =
  paths['/advisories']['get']['responses']['200']['content']['application/json'];

export const SECURITY_ADVISORIES_LIST_GLOBAL_ADVISORIES = new InjectionToken<
  (
    params?:
      | SecurityAdvisoriesListGlobalAdvisoriesParams
      | (() => SecurityAdvisoriesListGlobalAdvisoriesParams | undefined),
  ) => ReturnType<
    typeof httpResource<SecurityAdvisoriesListGlobalAdvisoriesResponse>
  >
>('SECURITY_ADVISORIES_LIST_GLOBAL_ADVISORIES');

export function provideSecurityAdvisoriesListGlobalAdvisories(): FactoryProvider {
  return {
    provide: SECURITY_ADVISORIES_LIST_GLOBAL_ADVISORIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | SecurityAdvisoriesListGlobalAdvisoriesParams
          | (() => SecurityAdvisoriesListGlobalAdvisoriesParams | undefined),
      ) =>
        httpResource<SecurityAdvisoriesListGlobalAdvisoriesResponse>(() => ({
          url: `${base}/advisories`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
