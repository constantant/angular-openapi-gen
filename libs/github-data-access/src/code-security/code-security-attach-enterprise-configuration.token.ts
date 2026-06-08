import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityAttachEnterpriseConfigurationBody = NonNullable<
  paths['/enterprises/{enterprise}/code-security/configurations/{configuration_id}/attach']['post']['requestBody']
>['content']['application/json'];

export type CodeSecurityAttachEnterpriseConfigurationResponse =
  paths['/enterprises/{enterprise}/code-security/configurations/{configuration_id}/attach']['post']['responses']['202']['content']['application/json'];

export const CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION = new InjectionToken<
  (
    enterprise: string,
    configurationId: string,
    body:
      | CodeSecurityAttachEnterpriseConfigurationBody
      | Signal<CodeSecurityAttachEnterpriseConfigurationBody>,
  ) => ReturnType<
    typeof httpResource<CodeSecurityAttachEnterpriseConfigurationResponse>
  >
>('CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION');

export function provideCodeSecurityAttachEnterpriseConfiguration(): FactoryProvider {
  return {
    provide: CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        configurationId: string,
        body:
          | CodeSecurityAttachEnterpriseConfigurationBody
          | Signal<CodeSecurityAttachEnterpriseConfigurationBody>,
      ) =>
        httpResource<CodeSecurityAttachEnterpriseConfigurationResponse>(() => ({
          url: `${base}/enterprises/${enterprise}/code-security/configurations/${configurationId}/attach`,
          method: 'POST',
          body,
        }));
    },
  };
}
