import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecurityAdvisoriesListOrgRepositoryAdvisoriesParams =
  paths['/orgs/{org}/security-advisories']['get']['parameters']['query'];

export type SecurityAdvisoriesListOrgRepositoryAdvisoriesResponse =
  paths['/orgs/{org}/security-advisories']['get']['responses']['200']['content']['application/json'];

export const SECURITY_ADVISORIES_LIST_ORG_REPOSITORY_ADVISORIES =
  new InjectionToken<
    (
      org: string,
      params?:
        | SecurityAdvisoriesListOrgRepositoryAdvisoriesParams
        | (() =>
            | SecurityAdvisoriesListOrgRepositoryAdvisoriesParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<SecurityAdvisoriesListOrgRepositoryAdvisoriesResponse>
    >
  >('SECURITY_ADVISORIES_LIST_ORG_REPOSITORY_ADVISORIES');

export function provideSecurityAdvisoriesListOrgRepositoryAdvisories(): FactoryProvider {
  return {
    provide: SECURITY_ADVISORIES_LIST_ORG_REPOSITORY_ADVISORIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | SecurityAdvisoriesListOrgRepositoryAdvisoriesParams
          | (() =>
              | SecurityAdvisoriesListOrgRepositoryAdvisoriesParams
              | undefined),
      ) =>
        httpResource<SecurityAdvisoriesListOrgRepositoryAdvisoriesResponse>(
          () => ({
            url: `${base}/orgs/${org}/security-advisories`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
