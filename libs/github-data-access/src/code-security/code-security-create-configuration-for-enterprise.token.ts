import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityCreateConfigurationForEnterpriseBody = NonNullable<
  paths['/enterprises/{enterprise}/code-security/configurations']['post']['requestBody']
>['content']['application/json'];

export type CodeSecurityCreateConfigurationForEnterpriseResponse =
  paths['/enterprises/{enterprise}/code-security/configurations']['post']['responses']['201']['content']['application/json'];

export const CODE_SECURITY_CREATE_CONFIGURATION_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      body:
        | CodeSecurityCreateConfigurationForEnterpriseBody
        | Signal<CodeSecurityCreateConfigurationForEnterpriseBody>,
    ) => ReturnType<
      typeof httpResource<CodeSecurityCreateConfigurationForEnterpriseResponse>
    >
  >('CODE_SECURITY_CREATE_CONFIGURATION_FOR_ENTERPRISE');

export function provideCodeSecurityCreateConfigurationForEnterprise(): FactoryProvider {
  return {
    provide: CODE_SECURITY_CREATE_CONFIGURATION_FOR_ENTERPRISE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        body:
          | CodeSecurityCreateConfigurationForEnterpriseBody
          | Signal<CodeSecurityCreateConfigurationForEnterpriseBody>,
      ) =>
        httpResource<CodeSecurityCreateConfigurationForEnterpriseResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/code-security/configurations`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
