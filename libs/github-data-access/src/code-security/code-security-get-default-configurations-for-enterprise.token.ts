import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityGetDefaultConfigurationsForEnterpriseResponse =
  paths['/enterprises/{enterprise}/code-security/configurations/defaults']['get']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
    ) => ReturnType<
      typeof httpResource<CodeSecurityGetDefaultConfigurationsForEnterpriseResponse>
    >
  >('CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS_FOR_ENTERPRISE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (enterprise: string) =>
        httpResource<CodeSecurityGetDefaultConfigurationsForEnterpriseResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/code-security/configurations/defaults`,
          }),
        );
    },
  });
