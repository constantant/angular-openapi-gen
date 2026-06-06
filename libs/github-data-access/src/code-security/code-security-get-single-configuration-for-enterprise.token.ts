import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityGetSingleConfigurationForEnterpriseResponse =
  paths['/enterprises/{enterprise}/code-security/configurations/{configuration_id}']['get']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_GET_SINGLE_CONFIGURATION_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      configurationId: string,
    ) => ReturnType<
      typeof httpResource<CodeSecurityGetSingleConfigurationForEnterpriseResponse>
    >
  >('CODE_SECURITY_GET_SINGLE_CONFIGURATION_FOR_ENTERPRISE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (enterprise: string, configurationId: string) =>
        httpResource<CodeSecurityGetSingleConfigurationForEnterpriseResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/code-security/configurations/${configurationId}`,
          }),
        );
    },
  });
