import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityGetRepositoriesForEnterpriseConfigurationParams =
  paths['/enterprises/{enterprise}/code-security/configurations/{configuration_id}/repositories']['get']['parameters']['query'];

export type CodeSecurityGetRepositoriesForEnterpriseConfigurationResponse =
  paths['/enterprises/{enterprise}/code-security/configurations/{configuration_id}/repositories']['get']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_GET_REPOSITORIES_FOR_ENTERPRISE_CONFIGURATION =
  new InjectionToken<
    (
      enterprise: string,
      configurationId: string,
      params?:
        | CodeSecurityGetRepositoriesForEnterpriseConfigurationParams
        | (() =>
            | CodeSecurityGetRepositoriesForEnterpriseConfigurationParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<CodeSecurityGetRepositoriesForEnterpriseConfigurationResponse>
    >
  >('CODE_SECURITY_GET_REPOSITORIES_FOR_ENTERPRISE_CONFIGURATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        configurationId: string,
        params?:
          | CodeSecurityGetRepositoriesForEnterpriseConfigurationParams
          | (() =>
              | CodeSecurityGetRepositoriesForEnterpriseConfigurationParams
              | undefined),
      ) =>
        httpResource<CodeSecurityGetRepositoriesForEnterpriseConfigurationResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/code-security/configurations/${configurationId}/repositories`,
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
