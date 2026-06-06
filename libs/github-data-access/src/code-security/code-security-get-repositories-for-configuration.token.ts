import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityGetRepositoriesForConfigurationParams =
  paths['/orgs/{org}/code-security/configurations/{configuration_id}/repositories']['get']['parameters']['query'];

export type CodeSecurityGetRepositoriesForConfigurationResponse =
  paths['/orgs/{org}/code-security/configurations/{configuration_id}/repositories']['get']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_GET_REPOSITORIES_FOR_CONFIGURATION =
  new InjectionToken<
    (
      org: string,
      configurationId: string,
      params?:
        | CodeSecurityGetRepositoriesForConfigurationParams
        | (() => CodeSecurityGetRepositoriesForConfigurationParams | undefined),
    ) => ReturnType<
      typeof httpResource<CodeSecurityGetRepositoriesForConfigurationResponse>
    >
  >('CODE_SECURITY_GET_REPOSITORIES_FOR_CONFIGURATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        configurationId: string,
        params?:
          | CodeSecurityGetRepositoriesForConfigurationParams
          | (() =>
              | CodeSecurityGetRepositoriesForConfigurationParams
              | undefined),
      ) =>
        httpResource<CodeSecurityGetRepositoriesForConfigurationResponse>(
          () => ({
            url: `${base}/orgs/${org}/code-security/configurations/${configurationId}/repositories`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
