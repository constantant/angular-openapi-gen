import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityUpdateEnterpriseConfigurationBody = NonNullable<
  paths['/enterprises/{enterprise}/code-security/configurations/{configuration_id}']['patch']['requestBody']
>['content']['application/json'];

export type CodeSecurityUpdateEnterpriseConfigurationResponse =
  paths['/enterprises/{enterprise}/code-security/configurations/{configuration_id}']['patch']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_UPDATE_ENTERPRISE_CONFIGURATION = new InjectionToken<
  (
    enterprise: string,
    configurationId: string,
    body:
      | CodeSecurityUpdateEnterpriseConfigurationBody
      | Signal<CodeSecurityUpdateEnterpriseConfigurationBody>,
  ) => ReturnType<
    typeof httpResource<CodeSecurityUpdateEnterpriseConfigurationResponse>
  >
>('CODE_SECURITY_UPDATE_ENTERPRISE_CONFIGURATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      enterprise: string,
      configurationId: string,
      body:
        | CodeSecurityUpdateEnterpriseConfigurationBody
        | Signal<CodeSecurityUpdateEnterpriseConfigurationBody>,
    ) =>
      httpResource<CodeSecurityUpdateEnterpriseConfigurationResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/code-security/configurations/${configurationId}`,
        method: 'PATCH',
        body,
      }));
  },
});
