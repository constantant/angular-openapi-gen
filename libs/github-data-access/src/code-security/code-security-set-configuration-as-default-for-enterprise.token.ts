import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecuritySetConfigurationAsDefaultForEnterpriseBody =
  NonNullable<
    paths['/enterprises/{enterprise}/code-security/configurations/{configuration_id}/defaults']['put']['requestBody']
  >['content']['application/json'];

export type CodeSecuritySetConfigurationAsDefaultForEnterpriseResponse =
  paths['/enterprises/{enterprise}/code-security/configurations/{configuration_id}/defaults']['put']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      configurationId: string,
      body:
        | CodeSecuritySetConfigurationAsDefaultForEnterpriseBody
        | Signal<CodeSecuritySetConfigurationAsDefaultForEnterpriseBody>,
    ) => ReturnType<
      typeof httpResource<CodeSecuritySetConfigurationAsDefaultForEnterpriseResponse>
    >
  >('CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT_FOR_ENTERPRISE');

export function provideCodeSecuritySetConfigurationAsDefaultForEnterprise(): FactoryProvider {
  return {
    provide: CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT_FOR_ENTERPRISE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        configurationId: string,
        body:
          | CodeSecuritySetConfigurationAsDefaultForEnterpriseBody
          | Signal<CodeSecuritySetConfigurationAsDefaultForEnterpriseBody>,
      ) =>
        httpResource<CodeSecuritySetConfigurationAsDefaultForEnterpriseResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/code-security/configurations/${configurationId}/defaults`,
            method: 'PUT',
            body,
          }),
        );
    },
  };
}
