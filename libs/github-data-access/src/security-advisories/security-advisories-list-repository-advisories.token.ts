import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecurityAdvisoriesListRepositoryAdvisoriesParams =
  paths['/repos/{owner}/{repo}/security-advisories']['get']['parameters']['query'];

export type SecurityAdvisoriesListRepositoryAdvisoriesResponse =
  paths['/repos/{owner}/{repo}/security-advisories']['get']['responses']['200']['content']['application/json'];

export const SECURITY_ADVISORIES_LIST_REPOSITORY_ADVISORIES =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      params?:
        | SecurityAdvisoriesListRepositoryAdvisoriesParams
        | (() => SecurityAdvisoriesListRepositoryAdvisoriesParams | undefined),
    ) => ReturnType<
      typeof httpResource<SecurityAdvisoriesListRepositoryAdvisoriesResponse>
    >
  >('SECURITY_ADVISORIES_LIST_REPOSITORY_ADVISORIES');

export function provideSecurityAdvisoriesListRepositoryAdvisories(): FactoryProvider {
  return {
    provide: SECURITY_ADVISORIES_LIST_REPOSITORY_ADVISORIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | SecurityAdvisoriesListRepositoryAdvisoriesParams
          | (() =>
              | SecurityAdvisoriesListRepositoryAdvisoriesParams
              | undefined),
      ) =>
        httpResource<SecurityAdvisoriesListRepositoryAdvisoriesResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/security-advisories`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
